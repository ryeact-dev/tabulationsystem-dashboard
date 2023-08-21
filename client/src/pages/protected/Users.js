import { useEffect } from "react";
import { headerStore, usersStore } from "../../app/store";
import Users from "../../features/settings/users";
import ErrorPage from "./404";

function InternalPage() {
  const currentUser = usersStore((state) => state.currentUser);
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed = currentUser.role !== "admin";
  const headerTitle = isAllowed ? "Not Authorize" : "Settings";
  const AllowPage = isAllowed ? <ErrorPage /> : <Users />;

  useEffect(() => {
    setPageTitle({ title: headerTitle });
  }, [headerTitle, setPageTitle]);

  return AllowPage;
}

export default InternalPage;
