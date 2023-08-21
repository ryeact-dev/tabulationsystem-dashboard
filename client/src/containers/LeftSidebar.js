import routes from "../routes/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { modalStore, usersStore } from "../app/store";
import {
  MODAL_BODY_TYPES,
  CONFIRMATION_MODAL_CLOSE_TYPES,
} from "../utils/globalConstantUtil";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

function LeftSidebar() {
  const location = useLocation();
  const currentUser = usersStore((state) => state.currentUser);
  const openModal = modalStore((state) => state.openModal);

  function logoutUser() {
    openModal({
      title: "Confirmation",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to logout?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.LOGOUT_USER,
      },
    });
  }

  function close() {
    document.getElementById("left-sidebar-drawer").click();
  }

  let sidebarMenus = routes;
  if (currentUser.role === "judge")
    sidebarMenus = sidebarMenus.filter(
      (menu) => menu.name === "Competitions" || menu.name === "Dashboard"
    );

  return (
    <div className='drawer-side '>
      <label htmlFor='left-sidebar-drawer' className='drawer-overlay'></label>
      <ul className='menu w-[14rem] bg-base-100 pt-2 text-base-content'>
        <button
          className='btn-ghost btn-circle btn absolute top-0 right-0 z-50 mt-4 mr-2 bg-base-300 lg:hidden'
          onClick={() => close()}
        >
          <XMarkIcon className='inline-block h-5 w-5' />
        </button>

        <li className='mb-2 text-xl text-primary font-semibold'>
          <h1>Tabulation Team</h1>
        </li>

        {sidebarMenus.map((route, i) => {
          return (
            <li className='' key={i}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${isActive ? "bg-base-200 font-semibold" : "font-normal"}`
                  }
                >
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className='absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                      aria-hidden='true'
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
      <footer className='w-full flex justify-center items-end pb-5'>
        <button
          onClick={logoutUser}
          className='w-10/12 btn btn-sm btn-outline btn-primary hover:!text-white'
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default LeftSidebar;
