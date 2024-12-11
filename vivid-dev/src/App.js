import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppRoutes } from "./app-routes/AppRoutes";
import { FollowTab, SideBar, MobileBottomBar, CreatePostBtn } from "./layouts";
import { CreatePostModal } from "./components";
import "./App.css";

function App() {
  const { theme } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  const sidebarRestrictedRoutes = ["/", "/signup"];
  return (
    <div
      className={
        "min-h-[100vh] " +
        (theme === "dark" ? "dark text-white bg-gray-800" : "bg-gray-100")
      }
    >
      <div
        className={sidebarRestrictedRoutes.includes(pathname) ? "" : "app-main"}
      >
        {!sidebarRestrictedRoutes.includes(pathname) && <CreatePostBtn />}
        {!sidebarRestrictedRoutes.includes(pathname) && <SideBar />}
        <AppRoutes />
        {!sidebarRestrictedRoutes.includes(pathname) && <FollowTab />}
        <MobileBottomBar />
        <CreatePostModal />
      </div>
    </div>
  );
}

export default App;
