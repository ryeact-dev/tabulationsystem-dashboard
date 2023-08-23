import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SidebarSubmenu({ submenu, name, icon }) {
  const location = useLocation();
  const [theme, setTheme] = useState("");
  const initialTheme = localStorage.getItem("theme");

  useEffect(() => {
    // === Determine the theme for font color when click ====
    initialTheme ? setTheme(initialTheme) : setTheme("autumn");
  }, [initialTheme]);

  return (
    <div
      className={`flex-col bg-transparent cursor-default ${
        theme === "autumn" ? "active:text-[#303030]" : "active:text-[#B4C6EF]"
      }`}
    >
      {/** Route header */}
      <div className='w-full '>
        {icon} {name}
      </div>
      {/** Submenu list */}
      <ul className={`menu menu-compact w-full`}>
        {submenu.map((m, k) => {
          return (
            <li key={k}>
              <NavLink
                end
                to={m.path}
               className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-primary font-semibold bg-base-100"
                          : "font-normal"
                      }`
                    }
              >
                {m.icon} {m.name}
                {location.pathname === m.path ? (
                  <span
                    className='absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                    aria-hidden='true'
                  ></span>
                ) : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
