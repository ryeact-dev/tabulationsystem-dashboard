import { useEffect } from "react";
import { headerStore } from "../../app/store";
import ScoresByCompetition from "../../features/results/scoresByCompetition";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Results" });
  }, [setPageTitle]);

  return <ScoresByCompetition />;
}

export default InternalPage;
