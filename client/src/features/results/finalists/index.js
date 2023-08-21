import { useState } from "react";
import { useQuery } from "react-query";
import { usersStore } from "../../../app/store";
import { getScoresheets } from "../../../api/scoresheetsApi";
import { getCandidates } from "../../../api/candidatesApi";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import TitleCard from "../../../components/Cards/TitleCard";
import FinalistTableData from "./components/FinalistTableData";
import TopSideButtons from "../../../components/TopSideButtons";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Finalists() {
  const allUsers = usersStore((state) => state.allUsers);
  const allJudges = allUsers.filter((user) => user.user_role === "judge");

  const [competitionResult, setCompetitionResult] = useState("");
  const [finalistCandidates, setFinalCandidates] = useState("");

  const { refetch: refetchCandidates } = useQuery(
    "candidates",
    () => getCandidates(),
    {
      onSuccess: ({ candidatesData }) =>
        setFinalCandidates(
          candidatesData.filter((candidate) => candidate.is_finalist === true)
        ),
    }
  );

  useQuery("scoresheets", () => getScoresheets(), {
    enabled: !!finalistCandidates,
    refetchInterval: 5000,
    onSuccess: ({ data }) => filteredData(data),
  });

  const filteredData = (scoresheetsData) => {
    // Create a new array of objects that includes the scores for each judge for each candidate
    const scoresByJudge = finalistCandidates.map((candidate) => {
      const candidateScores = scoresheetsData.filter(
        (item) =>
          parseInt(item.candidate_number) ===
            parseInt(candidate.candidate_number) && item.is_finalist === true
      );
      const scoresByJudge = allJudges.map((judge) => {
        const judgeScores = candidateScores.filter(
          (item) => parseInt(item.judge_number) === parseInt(judge.judge_number)
        );
        if (judgeScores.length > 0) {
          return judgeScores[0].total_score;
        } else {
          return 0;
        }
      });
      const totalScore = scoresByJudge.reduce((sum, score) => sum + score, 0);
      return {
        ...candidate,
        scores_by_judge: scoresByJudge,
        total_score: totalScore,
      };
    });

    // Sort candidates based on total score
    scoresByJudge.sort((a, b) => b.total_score - a.total_score);

    // Assign rank to each candidate
    scoresByJudge.forEach((candidate, index) => {
      candidate.rank = index + 1;
    });

    setCompetitionResult(scoresByJudge);
  };

  return (
    <TitleCard
      title='Finalists'
      topMargin='mt-2'
      TopSideButtons={
        <TopSideButtons
          btnName='Add/Remove Finalist'
          title='Add a Finalist'
          bodyType={MODAL_BODY_TYPES.FINALIST_ADD}
          extraObject={refetchCandidates}
        />
      }
    >
      {!competitionResult ? (
        <LoadingSpinner />
      ) : (
        <FinalistTableData competitionResult={competitionResult} />
      )}
    </TitleCard>
  );
}
