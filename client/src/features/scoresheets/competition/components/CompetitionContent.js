import { Image } from "../../../candidates/components/AddCandidatePhoto";
import { MODAL_BODY_TYPES } from "../../../../utils/globalConstantUtil";
import { modalStore } from "../../../../app/store";
import { useTransition, animated } from "@react-spring/web";
import LoadingSpinner from "../../../../components/LoadingSpinner";

export default function CompetitionContent({
  candidates,
  currentUser,
  scores,
  competition,
  judgeNumber,
  isLoading,
}) {
  const openModal = modalStore((state) => state.openModal);

  function addScoreButton(candidate, competition, candidateScores) {
    openModal({
      title: `Contestant No: ${candidate.candidate_number}`,
      bodyType: MODAL_BODY_TYPES.CANDIDATE_SCORE,
      extraObject: { candidate, competition, candidateScores },
    });
  }

  function candidateScore(candidateNumber) {
    return (
      scores.data?.find(
        (score) => score.candidate_number === parseInt(candidateNumber)
      )?.total_score || 0
    );
  }

  function isTheCandidate(candidateNumber) {
    return scores.data?.find(
      (score) => score.candidate_number === parseInt(candidateNumber)
    );
  }

  const transitions = useTransition(candidates, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
    trail: 100,
  });

  const content = transitions((styles, candidate) => (
    <animated.div
      style={styles}
      className='card card-side overflow-hidden bg-base-100 shadow-xl border-[1px] border-neutral flex-col items-center'
      key={candidate.id}
    >
      <figure className='rounded-none'>
        <img
          className="h-[24rem] w-full object-cover"
          src={candidate.photo}
          alt='candidatephoto'
          loading='lazy'
        />
      </figure>
      <div className='card-body p-4 w-full items-center'>
        <h2 className='card-title items-end'>
          Contestant No.:{" "}
          <span className='text-3xl text-primary'>
            {candidate.candidate_number}
          </span>
        </h2>

        <div className='-mt-3 font-bold text-primary flex flex-col items-center justify-center'>
          {currentUser.role !== "judge" && (
            <>
              <p className='text-2xl'>Score</p>
              <h1 className='-mt-1 text-7xl'>
                {judgeNumber === 0 ? (
                  0
                ) : isLoading ? (
                  <LoadingSpinner />
                ) : (
                  candidateScore(candidate.candidate_number)
                )}
              </h1>
            </>
          )}
        </div>

        {currentUser.role === "judge" && (
          <button
            className={`${
              candidateScore(candidate.candidate_number) > 0
                ? "btn-primary"
                : "btn-accent"
            }  btn w-full text-lg text-white`}
            onClick={() =>
              addScoreButton(
                candidate,
                competition,
                isTheCandidate(candidate.candidate_number)
              )
            }
          >
            {candidateScore(candidate.candidate_number) > 0
              ? "Scored"
              : "No Score"}
          </button>
        )}
      </div>
    </animated.div>
  ));

 return candidates ? (
    <section className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl-xl:grid-cols-6">
      {content}
    </section>
  ) : (
    <LoadingSpinner />
  );
}
