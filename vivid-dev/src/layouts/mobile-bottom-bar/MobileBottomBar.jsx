import {
  MdOutlineHome,
  MdHome,
  MdOutlineExplore,
  MdExplore,
  MdOutlineBookmarkBorder,
  MdBookmark,
  MdOutlineWbSunny,
  MdOutlinePersonOutline,
  MdPerson,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMoon } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "../../features";

const MobileBottomBar = () => {
  const {
    auth: { userDetails: authUserDetails },
    user: { theme },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <ul className="flex sm:hidden justify-between fixed bottom-0 right-0 left-0 p-2 bg-slate-200 dark:bg-black text-[28px]">
      <li>
        <NavLink
          to={"/home"}
          className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {({ isActive }) => (isActive ? <MdHome /> : <MdOutlineHome />)}
        </NavLink>
      </li>

      <li>
        <NavLink
          to={"/explore"}
          className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {({ isActive }) => (isActive ? <MdExplore /> : <MdOutlineExplore />)}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/bookmarks"}
          className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {({ isActive }) =>
            isActive ? <MdBookmark /> : <MdOutlineBookmarkBorder />
          }
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/profile/${authUserDetails?.username}`}
          className="flex items-center p-2 font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {({ isActive }) =>
            isActive ? <MdPerson /> : <MdOutlinePersonOutline />
          }
        </NavLink>
      </li>
      {theme === "dark" ? (
        <li className="p-2 block xl:hidden text-10xl">
          <MdOutlineWbSunny onClick={() => dispatch(toggleTheme())} />
        </li>
      ) : (
        <li className="p-2 block xl:hidden text-10xl">
          <HiOutlineMoon onClick={() => dispatch(toggleTheme())} />
        </li>
      )}
    </ul>
  );
};

export { MobileBottomBar };
