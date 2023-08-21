import { useEffect } from "react";
import { headerStore } from "../../app/store";
import Dashboard from "../../features/dashboard/index";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Dashboard" });
  }, [setPageTitle]);

  return <Dashboard />;
}

export default InternalPage;
