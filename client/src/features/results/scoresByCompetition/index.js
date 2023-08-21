import { useState } from "react";
import { useQuery } from "react-query";
import { usersStore } from "../../../app/store";
import { getScoresheetsWithParams } from "../../../api/scoresheetsApi";
import TitleCard from "../../../components/Cards/TitleCard";
import ByCompetitionTableData from "./components/ByCompetitionTableData";
import ByCompetitionTopSideButtonsFilter from "./components/ByCompetitionTopSideButtonsFilter";
import { SUBMENU } from "../../../routes/sidebar";
import LoadingSpinner from "../../../components/LoadingSpinner";

const INITIAL_COMP_OBJ = {
  number: 1,
  title: SUBMENU[0]?.competition_name || "Select",
  isFinalist: SUBMENU[0]?.is_finalist,
};

export default function ScoresByCompetition() {
  const [candidates, allUsers] = usersStore((state) => [
    state.candidates,
    state.allUsers,
  ]);
  const allJudges = allUsers.filter(
    (user) => user.user_role === "judge" && user
  );
  const [competitionResult, setCompetitionResult] = useState("");
  const [competition, setCompetition] = useState(INITIAL_COMP_OBJ);

  // === CHECK IF THE COMPETITION IS FOR FINALISTS ====
  let isFinalist = competition.isFinalist;
  let candidateList = candidates;
  if (isFinalist)
    candidateList = candidateList.filter(
      (candidate) => candidate.is_finalist === true
    );

  // ==== FETCH SCORESHEETS WITH PARAMS ====
  useQuery(
    ["scoresheets", { competitionNumber: competition.number, isFinalist }],
    () =>
      getScoresheetsWithParams({
        competitionNumber: competition.number,
        isFinalist,
      }),
    { onSuccess: ({ data }) => filteredData(data) }
  );

  const filteredData = (scoresheetsData) => {
    // Create a new array of objects that includes the scores for each judge for each candidate
    const scoresByJudge = candidateList.map((candidate) => {
      const candidateScores = scoresheetsData.filter(
        (item) => item.candidate_number === candidate.candidate_number
      );

      const scoresByJudge = allJudges.map((judge) => {
        const judgeScores = candidateScores.filter(
          (item) => item.judge_number === judge.judge_number
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
      title={`${competition.title} Competition`}
      topMargin='mt-2'
      TopSideButtons={
        <ByCompetitionTopSideButtonsFilter
          setCompetition={setCompetition}
          competitionNumber={competition.number}
        />
      }
    >
      {!competitionResult ? (
        <LoadingSpinner />
      ) : (
        <ByCompetitionTableData competitionResult={competitionResult} />
      )}
    </TitleCard>
  );
}
