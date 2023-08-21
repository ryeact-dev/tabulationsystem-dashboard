// All components mapping with path for internal routes

import { lazy } from "react";

const Users = lazy(() => import("../pages/protected/Users"));
const SettingsCompetitions = lazy(() =>
  import("../pages/protected/SettingsCompetitions")
);
const Competition = lazy(() => import("../pages/protected/Competition"));
const CompetitionAndJudges = lazy(() =>
  import("../pages/protected/CompetitionAndJudges")
);
const OverallScores = lazy(() => import("../pages/protected/OverallScores"));
const ScoresByCompetition = lazy(() =>
  import("../pages/protected/ScoresByCompetition")
);
const Finalists = lazy(() => import("../pages/protected/Finalists"));
const Candidates = lazy(() => import("../pages/protected/Candidates"));
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Judges = lazy(() => import("../pages/protected/Judges"));

const Page404 = lazy(() => import("../pages/protected/404"));
const Team = lazy(() => import("../pages/protected/Team"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/competitions/:id",
    component: Competition,
  },
  {
    path: "/candidates",
    component: Candidates,
  },
  {
    path: "/judges",
    component: Judges,
  },
  {
    path: "/results-competitionandjudges",
    component: CompetitionAndJudges,
  },
  {
    path: "/results-by-competition",
    component: ScoresByCompetition,
  },
  {
    path: "/results-overall",
    component: OverallScores,
  },
  {
    path: "/results-finalists",
    component: Finalists,
  },
  // {
  //   path: "/settings-profile",
  //   component: ProfileSettings,
  // },
  {
    path: "/settings-users",
    component: Users,
  },
  {
    path: "/settings-competitions",
    component: SettingsCompetitions,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/404",
    component: Page404,
  },
  // {
  //   path: "/forgot-password",
  //   component: ForgotPassword,
  // },
];

export default routes;
