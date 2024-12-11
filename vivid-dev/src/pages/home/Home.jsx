import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiSettingsKnobs } from "react-icons/gi";
import { useSelector } from "react-redux";
import { FiTrendingUp } from "react-icons/fi";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { Post, CreatePost, Loader, PrimaryButton } from "../../components";
import { useDetectClick } from "../../hooks";

const Home = () => {
  const {
    post: { posts, loading: isPostLoading },
    auth: { userDetails: authUser },
    user: { users },
  } = useSelector((state) => state);
  const authUserDetails = users.find(
    (user) => user?.username === authUser?.username
  );
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortState, setSortState] = useState("Latest");
  const navigate = useNavigate();
  const toggleShowOptions = () => {
    setShowSortOptions((prev) => !prev);
  };
  const sortOptionsRef = useRef(null);

  useDetectClick(sortOptionsRef, setShowSortOptions);

  const getUserByUserName = (username) =>
    users.filter((user) => user?.username === username)[0];

  const postsForAuthUser = posts?.filter((post) => {
    return (
      post?.username === authUserDetails?.username ||
      getUserByUserName(post?.username)?.followers?.find(
        (user) => user?.username === authUserDetails?.username
      )
    );
  });

  const sortPosts = () => {
    const copy = postsForAuthUser.slice();
    if (sortState === "Latest") {
      copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortState === "Oldest") {
      copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortState === "Trending") {
      copy.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    }
    return copy;
  };

  const filteredPosts = sortPosts();

  return (
    <div>
      <h1 className="text-2xl pt-7 mb-4 pl-5">Home</h1>
      <div className="hidden lg:block">
        <CreatePost />
      </div>
      {isPostLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      ) : filteredPosts?.length > 0 ? (
        <>
          <div className="relative flex justify-between items-center pl-5 pr-1">
            <h1 className="text-xl pt-7 mb-4">{sortState} posts</h1>
            <GiSettingsKnobs
              className="text-xl cursor-pointer"
              onClick={toggleShowOptions}
            />
            {showSortOptions && (
              <div
                ref={sortOptionsRef}
                className="absolute top-[50px] z-10 right-0 p-2 rounded-lg cursor-pointer bg-slate-200 dark:bg-black"
              >
                <div
                  className="flex gap-2 items-center hover:text-blue-500"
                  onClick={() => {
                    setSortState("Trending");
                    toggleShowOptions();
                  }}
                >
                  <FiTrendingUp />
                  <p>Trending</p>
                </div>
                <div
                  className="flex gap-2 items-center mt-2 hover:text-blue-500"
                  onClick={() => {
                    setSortState("Latest");
                    toggleShowOptions();
                  }}
                >
                  <BsSortDown />
                  <p>Latest</p>
                </div>
                <div
                  className="flex gap-2 items-center mt-2 hover:text-blue-500"
                  onClick={() => {
                    setSortState("Oldest");
                    toggleShowOptions();
                  }}
                >
                  <BsSortUp />
                  <p>Oldest</p>
                </div>
              </div>
            )}
          </div>
          {filteredPosts.map((post) => (
            <Post postDetails={post} key={post?._id} />
          ))}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center mt-20">
          <h1 className="text-3xl mb-5">No posts found here</h1>
          <PrimaryButton clickHandler={() => navigate("/explore")}>
            Go to explore page
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export { Home };
