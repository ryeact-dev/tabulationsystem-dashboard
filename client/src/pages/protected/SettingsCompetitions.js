import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import Competitions from "../../features/settings/competitions";
import ErrorPage from "./404";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role === "admin";
  const headerTitle = isAllowed ? "Competitions" : "Not Authorize";
  const AllowPage = isAllowed ? <Competitions /> : <ErrorPage />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [setPageTitle, headerTitle]);

  return AllowPage;
}

export default InternalPage;
