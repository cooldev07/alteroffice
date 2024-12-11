import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import {
  Home,
  Explore,
  Bookmarks,
  SignUp,
  Profile,
  SignIn,
  SinglePost,
  NotFound,
} from "../pages";

const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/signup" element={<Navigate to="/home" />} />
        </>
      )}
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { AppRoutes };
