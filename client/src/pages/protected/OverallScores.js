import { useEffect } from "react";
import { headerStore } from "../../app/store";
import Overall from "../../features/results/overall";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Results" });
  }, [setPageTitle]);

  return <Overall />;
}

export default InternalPage;
