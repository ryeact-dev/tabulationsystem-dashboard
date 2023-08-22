import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { usersStore } from "../../../app/store";
import { getScoresheetsWithParams } from "../../../api/scoresheetsApi";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import ReactToPrint from "react-to-print";
import TitleCard from "../../../components/Cards/TitleCard";
import OverallTableData from "./components/OverallTableData";
import LoadingSpinner from "../../../components/LoadingSpinner";
import TopSideButtons from "../../../components/TopSideButtons";

export default function Overall() {
  const componentToPrintRef = useRef();
  const candidates = usersStore((state) => state.candidates);
  const [competitionResult, setCompetitionResult] = useState("");

  useQuery(
    "scoresheets",
    () => getScoresheetsWithParams({ isFinalist: false }),
    { onSuccess: ({ data }) => filteredData(data) }
  );

  const filteredData = (scoresheetsData) => {
    // Create a new array of objects that includes the total score for each candidate in each competition
    const totalScoresByComp = candidates.map((candidate) => {
      const candidateScores = scoresheetsData.filter(
        (item) =>
          parseInt(item.candidate_number) ===
          parseInt(candidate.candidate_number)
      );
      const totalScoreByComp = candidateScores.reduce((acc, curr) => {
        const compNumber = curr.competition_number;
        if (!acc[compNumber - 1]) {
          acc[compNumber - 1] = 0;
        }
        acc[compNumber - 1] += curr.total_score;
        return acc;
      }, []);
      return {
        ...candidate,
        total_score_by_comp: totalScoreByComp,
      };
    });

    // Create a new array of objects that includes the total score for each candidate across all competitions
    const totalScores = totalScoresByComp.map((item) => {
      const totalScore = item.total_score_by_comp.reduce(
        (acc, curr) => acc + curr,
        0
      );
      return {
        ...item,
        total_score: totalScore,
      };
    });

    // Sort the totalScores array in descending order based on total score
    totalScores.sort((a, b) => b.total_score - a.total_score);

    // Create a new array of objects that includes the rank property
    const rankedScores = totalScores.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    // Combine the data from the candidates and rankedScores arrays
    const newCombinedData = rankedScores.map((rankedScore) => {
      const candidate = candidates.find(
        ({ candidate_number }) =>
          parseInt(candidate_number) === parseInt(rankedScore.candidate_number)
      );
      return {
        ...candidate,
        ...rankedScore,
      };
    });

    setCompetitionResult(newCombinedData);
  };

  const printResultsBtn = (
    <button className="btn-primary text-white btn-sm btn px-6 normal-case">
      Print Finalists
    </button>
  );

  const reactToPrintBtn = (
    <ReactToPrint
      trigger={() => printResultsBtn}
      content={() => componentToPrintRef.current}
    />
  );

  return (
    <TitleCard
      title={reactToPrintBtn}
      topMargin="mt-2"
      TopSideButtons={
        <TopSideButtons
          btnName="Add/Remove Finalist"
          title="Add a Finalist"
          bodyType={MODAL_BODY_TYPES.FINALIST_ADD}
        />
      }
    >
      {!competitionResult ? (
        <LoadingSpinner />
      ) : (
        <OverallTableData
          title="Overall Scores ( total of all judges scores in all minor competitions )"
          competitionResult={competitionResult}
          componentToPrintRef={componentToPrintRef}
        />
      )}
    </TitleCard>
  );
}
