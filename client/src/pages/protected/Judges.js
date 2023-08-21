import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import ErrorPage from "./404";

import Judges from "../../features/judges";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Judges";
  const AllowPage = isAllowed ? <ErrorPage /> : <Judges />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [setPageTitle, headerTitle]);

  return AllowPage;
}
export default InternalPage;
