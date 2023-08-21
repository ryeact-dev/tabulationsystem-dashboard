import axios from "axios";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = ["login"];

  const isPublicPage = PUBLIC_ROUTES.some((route) =>
    window.location.href.includes(route)
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
    return TOKEN;
  }
};

export default checkAuth;
