import { useEffect } from "react";
import { headerStore } from "../../app/store";
import Finalists from "../../features/results/finalists";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Results" });
  }, [setPageTitle]);

  return <Finalists />;
}

export default InternalPage;
