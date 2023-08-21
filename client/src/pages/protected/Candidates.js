import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import ErrorPage from "./404";
import Candidates from "../../features/candidates";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Contestants";
  const AllowPage = isAllowed ? <ErrorPage /> : <Candidates />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [setPageTitle, headerTitle]);

  return AllowPage;
}

export default InternalPage;
