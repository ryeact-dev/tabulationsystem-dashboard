import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import CompetitionAndJudges from "../../features/results/competitionsAndJudges";
import ErrorPage from "./404";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Results";
  const AllowPage = isAllowed ? <ErrorPage /> : <CompetitionAndJudges />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [headerTitle, setPageTitle]);

  return AllowPage;
}

export default InternalPage;
