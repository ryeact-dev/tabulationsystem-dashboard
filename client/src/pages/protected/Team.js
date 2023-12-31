import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import Team from "../../features/settings/team";

import ErrorPage from "./404";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Settings";
  const AllowPage = isAllowed ? <ErrorPage /> : <Team />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [setPageTitle, headerTitle]);

  return AllowPage;
}

export default InternalPage;
