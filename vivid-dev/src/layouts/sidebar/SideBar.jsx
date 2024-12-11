import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MdOutlineHome,
  MdHome,
  MdOutlineExplore,
  MdExplore,
  MdOutlineBookmarkBorder,
  MdBookmark,
  MdOutlineWbSunny,
} from "react-icons/md";
import { HiOutlineMoon } from "react-icons/hi";
import { BsPencil } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getUsers,
  openPostModal,
  toggleTheme,
  getAllPosts,
} from "../../features";
import {
  PrimaryButton,
  PrimaryOutlinedButton,
  ProfileImage,
  Loader,
  Logo,
} from "../../components";

const SideBar = () => {
  const dispatch = useDispatch();

  const {
    auth: {
      userDetails: { username },
      token,
    },
    user: { users, uploadingImg, theme },
  } = useSelector((state) => state);
  const currentUserDetails = users?.find((user) => user.username === username);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllPosts());
  }, [token, dispatch]);
  return (
    <div className="hidden sm:flex flex-col justify-between sticky h-screen top-0 py-3">
      <ul className="p-4 flex flex-col gap-y-5 bg-slate-100 rounded dark:bg-slate-800">
        <li className="ml-2 hidden xl:block">
          <Logo fontSize={"text-4xl"} />
        </li>
        <li>
          <NavLink
            to={"/home"}
            className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-3xl"
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <div className="xl:mr-2 flex">
                    <MdHome />
                  </div>
                  <span className="ml-3 text-xl hidden xl:block font-bold">
                    Home
                  </span>
                </>
              ) : (
                <>
                  <div className="xl:mr-2 flex">
                    <MdOutlineHome />
                  </div>
                  <span className="ml-3 text-xl hidden xl:block">Home</span>
                </>
              )
            }
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/explore"}
            className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-3xl"
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <div className="xl:mr-2 flex">
                    <MdExplore />
                  </div>
                  <span className="ml-3 text-xl hidden xl:block font-bold">
                    Explore
                  </span>
                </>
              ) : (
                <>
                  <div className="xl:mr-2 flex">
                    <MdOutlineExplore />
                  </div>
                  <span className="ml-3 text-xl hidden xl:block">Explore</span>
                </>
              )
            }
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/bookmarks"}
            className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-3xl"
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <div className="xl:mr-2 flex">
                    <MdBookmark />
                  </div>
                  <span className="ml-3 text-xl hidden xl:block font-bold">
                    Bookmarks
                  </span>
                </>
              ) : (
                <>
                  <div className="xl:mr-2 flex">
                    <MdOutlineBookmarkBorder />
                  </div>
                  <span className="ml-3 text-xl hidden xl:block">
                    Bookmarks
                  </span>
                </>
              )
            }
          </NavLink>
        </li>
        <li className="hidden xl:block">
          <PrimaryOutlinedButton
            fullWidth={true}
            clickHandler={() => dispatch(toggleTheme())}
          >
            Toggle theme
          </PrimaryOutlinedButton>
        </li>
        {theme === "dark" ? (
          <li className="p-2 block xl:hidden text-3xl">
            <MdOutlineWbSunny onClick={() => dispatch(toggleTheme())} />
          </li>
        ) : (
          <li className="p-2 block xl:hidden text-3xl">
            <HiOutlineMoon onClick={() => dispatch(toggleTheme())} />
          </li>
        )}
        <li className="hidden xl:block ">
          <PrimaryButton
            fullWidth={true}
            clickHandler={() => {
              dispatch(openPostModal());
            }}
          >
            Create post
          </PrimaryButton>
        </li>
        <li>
          <div
            className="flex justify-center items-center bg-blue-500 w-12 h-12 rounded-full text-2xl xl:hidden"
            onClick={() => dispatch(openPostModal())}
          >
            <BsPencil />
          </div>
        </li>
      </ul>
      <div
        className="flex mb-3 p-4 cursor-pointer rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600"
        onClick={() => navigate(`/profile/${currentUserDetails?.username}`)}
      >
        <div className="w-12 h-12 flex-shrink-0 text-lg">
          <ProfileImage
            profileUrl={currentUserDetails?.profileUrl}
            firstName={currentUserDetails?.firstName}
            lastName={currentUserDetails?.lastName}
          />
        </div>
        <div className=" flex-col gap-x-2 ml-3 hidden xl:flex">
          <p>{`${currentUserDetails?.firstName || "N"} ${
            currentUserDetails?.lastName || "A"
          }`}</p>
          <p className="text-slate-400">
            @{currentUserDetails?.username || "na"}
          </p>
        </div>
      </div>
    </div>
  );
};

export { SideBar };
