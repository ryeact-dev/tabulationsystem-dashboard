import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import Competitions from "../../features/settings/competitions";
import ErrorPage from "./404";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Settings";
  const AllowPage = isAllowed ? <ErrorPage /> : <Competitions />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [setPageTitle, headerTitle]);

  return AllowPage;
}

export default InternalPage;
