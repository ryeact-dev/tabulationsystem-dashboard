import { lazy, useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const token = checkAuth();

function App() {
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/app/*", element: <Layout /> },
    {
      path: "*",
      element: <Navigate to={token ? "/app/welcome" : "/login"} replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
