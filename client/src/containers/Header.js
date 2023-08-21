import { themeChange } from "theme-change";
import { useEffect, useState } from "react";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";

import { headerStore, usersStore } from "../app/store";

function Header() {
  const pageTitle = headerStore((state) => state.pageTitle);
  const currentUser = usersStore((state) => state.currentUser);

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: night)").matches
      ) {
        setCurrentTheme("night");
      } else {
        setCurrentTheme("autumn");
      }
    }
    // 👆 false parameter is required for react project
  }, []);

  return (
    <>
      <div className='navbar flex justify-between bg-base-100 z-10 shadow-md '>
        {/* Menu toogle for mobile view or small screen */}
        <div>
          <label
            htmlFor='left-sidebar-drawer'
            className='btn btn-primary drawer-button lg:hidden'
          >
            <Bars3Icon className='h-5 inline-block w-5' />
          </label>
          <h1 className='text-2xl font-semibold ml-2'>{pageTitle}</h1>
        </div>

        {/* Profile icon, opening menu on click */}
        <div>
          <h1 className='text-xl font-base'>
            Welcome{" "}
            <span className='font-semibold text-primary'>
              {currentUser.fullName}
            </span>{" "}
            {currentUser.judgeNumber > 0 && "as Judge Number: "}
            <span className='font-semibold text-secondary'>
              {currentUser.judgeNumber > 0 && currentUser.judgeNumber}
            </span>
          </h1>
        </div>

        <div className='order-last mr-4'>
          {/* autumn and night theme selection toogle **/}
          <label className='swap '>
            <input type='checkbox' />
            <SunIcon
              data-set-theme='autumn'
              data-act-class='ACTIVECLASS'
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "night" ? "swap-on" : "swap-off")
              }
            />
            <MoonIcon
              data-set-theme='night'
              data-act-class='ACTIVECLASS'
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "autumn" ? "swap-on" : "swap-off")
              }
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default Header;
