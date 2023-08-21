import { useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ModalLayout from "./ModalLayout";
import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useQuery } from "react-query";
import { getCurrentUser, getUsers } from "../api/usersApi";
import { headerStore, usersStore } from "../app/store";
import { getCandidates } from "../api/candidatesApi";

function Layout() {
  const [
    removeNotificationMessage,
    newNotificationMessage,
    newNotificationStatus,
  ] = headerStore((state) => [
    state.removeNotificationMessage,
    state.newNotificationMessage,
    state.newNotificationStatus,
  ]);

  const [setCandidates, setCurrentUser, setAllUsers] = usersStore((state) => [
    state.setCandidates,
    state.setCurrentUser,
    state.setAllUsers,
  ]);

  useQuery("current-user", () => getCurrentUser(), {
    onSuccess: ({ currentUser }) => {
      const userData = {
        fullName: currentUser.full_name,
        judgeNumber: currentUser.judge_number,
        role: currentUser.user_role,
      };
      setCurrentUser(userData);
    },
  });

  useQuery("users", () => getUsers(), {
    onSuccess: ({ data }) => setAllUsers(data),
  });

  useQuery("candidates", () => getCandidates(), {
    onSuccess: ({ candidatesData }) => setCandidates(candidatesData),
  });

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 0)
        NotificationManager.error(newNotificationMessage, "Error");
      if (newNotificationStatus === 1)
        NotificationManager.success(newNotificationMessage, "Success");
      if (newNotificationStatus === 2)
        NotificationManager.warning(newNotificationMessage, "Warning");
      if (newNotificationStatus === 3)
        NotificationManager.info(newNotificationMessage, "Info");
      removeNotificationMessage();
    }
  }, [
    newNotificationMessage,
    newNotificationStatus,
    removeNotificationMessage,
  ]);

  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className='drawer drawer-mobile'>
        <input
          id='left-sidebar-drawer'
          type='checkbox'
          className='drawer-toggle'
        />
        <PageContent />
        <LeftSidebar />
      </div>

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />
    </>
  );
}

export default Layout;
