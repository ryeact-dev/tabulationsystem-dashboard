import { useEffect } from "react";
import { headerStore } from "../../app/store";
import CompetitionAndJudges from "../../features/results/competitionsAndJudges";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Results" });
  }, [setPageTitle]);

  return <CompetitionAndJudges />;
}

export default InternalPage;
