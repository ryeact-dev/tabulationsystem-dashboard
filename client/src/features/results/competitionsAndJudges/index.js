import { useCallback, useState, useRef } from "react";
import { useQuery } from "react-query";
import { getScoresheetsWithParams } from "../../../api/scoresheetsApi";
import { usersStore } from "../../../app/store";
import ReactToPrint from "react-to-print";
import TitleCard from "../../../components/Cards/TitleCard";
import CandJTableData from "./components/CandJTableData";
import TopSideButtonsFilter from "./components/TopSideButtonsFilter";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function CompetitionAndJudges() {
  const componentToPrintRef = useRef();
  const [allUsers, currentUser, candidates] = usersStore((state) => [
    state.allUsers,
    state.currentUser,
    state.candidates,
  ]);
  const [filteredResults, setFilteredResults] = useState("");
  const [compTitle, setCompTitle] = useState("");
  const [competitionResult, setCompetitionResult] = useState([]);
  const [judgeNumber, setJudgeNumber] = useState(1);
  const [competitionNumber, setCompetitionNumber] = useState(1);

  // ==== FETCH SCORESHEETS WITH PARAMS ====
  useQuery(
    ["scoresheets", competitionNumber, judgeNumber],
    () => getScoresheetsWithParams({ competitionNumber, judgeNumber }),
    { onSuccess: ({ data }) => filteredData(data) }
  );

  const filteredData = (scoresheetsData) => {
    // Sort the filteredScores array in descending order based on total score
    scoresheetsData.sort((a, b) => b.total_score - a.total_score);

    // Create a new array of objects that includes the rank property
    const rankedScores = scoresheetsData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    // Combine the data from the candidates and rankedScores arrays
    const newCombinedData = candidates
      .map((candidate) => {
        const rankedScore = rankedScores.find(
          ({ candidate_number }) =>
            parseInt(candidate_number) === parseInt(candidate.candidate_number)
        );
        return {
          ...candidate,
          ...rankedScore,
        };
      })
      .filter((candidate) => candidate.total_score !== undefined); // Exclude candidates without a total score

    // Sort the combined data in ascending order based on rank
    newCombinedData.sort((a, b) => a.rank - b.rank);

    setCompetitionResult(newCombinedData);

    let compName;
    if (rankedScores.length > 0) {
      compName = rankedScores[0].competition_name;
    } else {
      compName = "";
    }

    setFilteredResults(rankedScores);
    setCompTitle(compName);
  };

  const setFilterJudgeNumber = useCallback((params) => {
    setJudgeNumber(params);
  }, []);

  const setFilterCompetitionNumber = useCallback((params) => {
    setCompetitionNumber(params);
  }, []);

  const printResultsBtn = (
    <button className='btn-primary text-white btn-sm btn px-6 normal-case'>
      Print Results
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
      topMargin='mt-2'
      TopSideButtons={
        currentUser.role !== "judge" && (
          <TopSideButtonsFilter
            setFilterJudgeNumber={setFilterJudgeNumber}
            setFilterCompetitionNumber={setFilterCompetitionNumber}
            judgeNumber={judgeNumber}
            competitionNumber={competitionNumber}
          />
        )
      }
    >
      {!filteredResults ? (
        <LoadingSpinner />
      ) : (
        <CandJTableData
          allUsers={allUsers}
          judgeNumber={judgeNumber}
          title={`${compTitle} Competition`}
          componentToPrintRef={componentToPrintRef}
          competitionResult={competitionResult}
          filteredResults={filteredResults}
        />
      )}
    </TitleCard>
  );
}
