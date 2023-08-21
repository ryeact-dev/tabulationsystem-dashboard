import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { candidateScore } from "../../../api/scoresheetsApi";
import { Image } from "../../candidates/components/AddCandidatePhoto";
import { headerStore, usersStore } from "../../../app/store";

export default function AddScoreModalBody({ closeModal, extraObject }) {
  const currentUser = usersStore((state) => state.currentUser);
  const showNotification = headerStore((state) => state.showNotification);
  const { candidate, competition, candidateScores } = extraObject;
  const [scoresheetObj, setScoresheetObj] = useState(
    candidateScores || competition
  );
  const [totalScore, setTotalScore] = useState(
    candidateScores?.total_score || 0
  );

  const queryClient = useQueryClient();
  const candidateScoreMutation = useMutation(candidateScore, {
    onError: ({ response }) =>
      showNotification({ message: response.data, status: 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries("scoresheets");
      showNotification({ message: "Scores successfully submitted", status: 1 });
      closeModal();
    },
  });

  function formCalculateTotal() {
    return scoresheetObj?.scoresheet.reduce(
      (total, score) => total + (score.score || 0),
      0
    );
  }

  function updateRangeValue(evt, scoreIndex) {
    const value = evt.target.value;
    setScoresheetObj((prevState) => ({
      ...prevState,
      scoresheet: prevState.scoresheet.map((score, i) =>
        i === scoreIndex ? { ...score, score: parseInt(value) } : score
      ),
    }));
  }

  function saveCandidateScore() {
     const scoreData = {
      ...scoresheetObj,
      total_score: totalScore,
      judgeName: currentUser.fullName,
      judgeNumber: currentUser.judgeNumber,
      candidateNumber: candidate.candidate_number,
      isFinalist: competition.is_finalist,
    };

    let typeOfScore;
    if (candidateScores) {
      typeOfScore = "update";
      candidateScoreMutation.mutate({ scoreData, typeOfScore });
    } else {
      typeOfScore = "new";
      candidateScoreMutation.mutate({ scoreData, typeOfScore });
    }
  }

  useEffect(() => setTotalScore(formCalculateTotal()), [scoresheetObj]);

  console.log(competition);

  return (
    <>
      <figure className='flex w-[16rem] items-center gap-6'>
        <img
          className='rounded-2xl'
          src={candidate.photo}
          alt='candidatephoto'
        />
        <figcaption className='text-center'>
          <h2 className='text-4xl font-semibold'>Score</h2>
          <h1 className='text-8xl font-bold text-primary'>{totalScore}</h1>
        </figcaption>
      </figure>
      <div>
        <h2 className='mt-2 text-2xl text-primary font-semibold'>{`${competition.competition_name} Competition`}</h2>
        {scoresheetObj.scoresheet.map((item, i) => (
          <div key={i} className='flex items-center justify-between gap-8'>
            <div className='mt-2 w-full'>
              <h1 className='pb-2 text-lg font-semibold'>
                {item.headerTitle} [{item.percentage}%]
              </h1>
              <input
                type='range'
                min={0}
                max={item.percentage}
                defaultValue={item.score || 0}
                onChange={(e) => updateRangeValue(e, i)}
                className='range range-primary'
              />
            </div>
            <label className='mt-6 text-xl font-semibold'>
              {item.score || 0}
            </label>
          </div>
        ))}
      </div>

      <div className='modal-action'>
        <button className='btn-ghost btn' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className='btn-primary btn px-6 text-white'
          onClick={saveCandidateScore}
          disabled={candidateScoreMutation.isLoading}
        >
          {candidateScoreMutation.isLoading ? "Submitting.." : "Submit Score"}
        </button>
      </div>
    </>
  );
}
