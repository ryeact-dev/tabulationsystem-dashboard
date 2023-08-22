import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { usersStore } from "../../../app/store";
import { getScoresheetsWithParams } from "../../../api/scoresheetsApi";
import { getSpecificCompetition } from "../../../api/competitionsApi";
import TitleCard from "../../../components/Cards/TitleCard";
import TopSideButtons from "../components/TopSideButtons";
import CompetitionContent from "./components/CompetitionContent";

export default function Competition() {
  const [competition, setCompetition] = useState([]);
  const [candidates, currentUser] = usersStore((state) => [
    state.candidates,
    state.currentUser,
  ]);
  const [judgeNumberFilter, setJudgeNumberFilter] = useState(
    currentUser.judgeNumber
  );

  const { id } = useParams();

  useQuery(
    ["competitions", id],
    () => getSpecificCompetition({ competitionId: id }),
    { onSuccess: ({ data }) => setCompetition(data[0]) }
  );

  const isFinalist = competition?.is_finalist;
  const competitionNumber = competition?.competition_number;

  const { isLoading, data: scores = [] } = useQuery(
    ["scoresheets", judgeNumberFilter, competitionNumber, isFinalist],
    () =>
      getScoresheetsWithParams({
        competitionNumber, // hard coded competition number
        judgeNumber: judgeNumberFilter,
        isFinalist,
      }),
    { enabled: !!competitionNumber }
  );

  let candidateList;
  isFinalist
    ? (candidateList = candidates.filter(
        (candidate) => candidate.is_finalist === true
      ))
    : (candidateList = candidates);

  function applyFilter(params) {
    setJudgeNumberFilter(params);
  }

  return (
    <TitleCard
      title={`${competition.competition_name} Competition`}
      topMargin='mt-2'
      TopSideButtons={
        currentUser.role !== "judge" && (
          <TopSideButtons
            applyFilter={applyFilter}
            judgeNumber={judgeNumberFilter}
          />
        )
      }
    >
      <CompetitionContent
        isLoading={isLoading}
        judgeNumber={judgeNumberFilter}
        candidates={competitionNumber ? candidateList : ""}
        currentUser={currentUser}
        scores={scores}
        competition={competition}
      />
    </TitleCard>
  );
}
