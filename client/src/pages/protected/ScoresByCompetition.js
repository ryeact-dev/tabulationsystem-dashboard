import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import ScoresByCompetition from "../../features/results/scoresByCompetition";
import ErrorPage from "./404";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Results";
  const AllowPage = isAllowed ? <ErrorPage /> : <ScoresByCompetition />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [setPageTitle, headerTitle]);

  return AllowPage;
}

export default InternalPage;
