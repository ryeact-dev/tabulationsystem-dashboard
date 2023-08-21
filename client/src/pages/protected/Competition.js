import { useEffect } from "react";
import { headerStore } from "../../app/store";
import Competition from "../../features/scoresheets/competition";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Competitions" });
  }, [setPageTitle]);

  return <Competition />;
}

export default InternalPage;
