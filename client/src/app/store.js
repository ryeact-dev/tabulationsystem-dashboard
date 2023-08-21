import { create } from "zustand";

export const headerStore = create((set) => ({
  pageTitle: "Home", // current page title state management
  noOfNotifications: 15, // no of unread notifications
  newNotificationMessage: "", // message of notification to be shown
  newNotificationStatus: 1, // to check the notification type -  success/ error/ info

  setPageTitle: ({ title }) => set(() => ({ pageTitle: title })),
  removeNotificationMessage: () => set(() => ({ newNotificationMessage: "" })),
  showNotification: ({ message, status }) =>
    set(() => ({
      newNotificationMessage: message,
      newNotificationStatus: status,
    })),
}));

export const modalStore = create((set) => ({
  title: "", // current  title state management
  isOpen: false, // modal state management for opening closing
  bodyType: "", // modal content management
  size: "", // modal content management
  extraObject: {},

  openModal: ({ title, bodyType, extraObject, size }) =>
    set(() => ({
      isOpen: true,
      bodyType: bodyType,
      title: title,
      size: size || "md",
      extraObject: extraObject,
    })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
      bodyType: "",
      title: "",
      extraObject: {},
    })),
}));

export const usersStore = create((set) => ({
  candidates: [],
  allUsers: [],
  currentUser: { fullName: "", judgeNumber: 0, role: "" },

  setCandidates: (candidates) => set(() => ({ candidates })),

  setAllUsers: ({ allUsers }) => set(() => ({ allUsers })),

  setCurrentUser: (userData) =>
    set(() => ({
      currentUser: {
        fullName: userData.fullName,
        judgeNumber: userData.judgeNumber,
        role: userData.role,
      },
    })),
}));
