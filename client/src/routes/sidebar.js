/** Icons are imported separately to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import DocumentChartBarIcon from "@heroicons/react/24/outline/DocumentChartBarIcon";
import { generateSubmenu } from "../utils/dataForRoutes";

export const SUBMENU = await generateSubmenu();

const iconClasses = `h-6 w-6`;
// const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={`${iconClasses} inline -mr-2`} />,
    name: "Dashboard",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Competitions", // name that appear in Sidebar
    submenu: SUBMENU,
  },
  {
    path: "",
    icon: <DocumentChartBarIcon className={`${iconClasses} inline`} />,
    name: "Results",
    submenu: [
      {
        path: "/app/results-competitionandjudges",
        // icon: <UserIcon className={submenuIconClasses} />,
        name: "Competition & Judges",
      },
      {
        path: "/app/results-by-competition",
        // icon: <UserIcon className={submenuIconClasses} />,
        name: "Scores by Competition",
      },
      {
        path: "/app/results-overall",
        // icon: <UserIcon className={submenuIconClasses} />,
        name: "Overall Scores",
      },
      {
        path: "/app/results-finalists",
        // icon: <UserIcon className={submenuIconClasses} />,
        name: "Finalists",
      },
    ],
  },
  {
    path: "",
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
    name: "Settings",
    submenu: [
      {
        path: "/app/settings-users",
        name: "Users",
      },
      {
        path: "/app/candidates",
        name: "Contestants",
      },
      {
        path: "/app/settings-competitions",
        name: "Competitions",
      },
      {
        path: "/app/settings-team",
        name: "Team Members",
      },
    ],
  },
];

export default routes;
