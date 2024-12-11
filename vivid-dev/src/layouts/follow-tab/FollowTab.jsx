import { useState } from "react";
import { useSelector } from "react-redux";
import { HorizontalProfile } from "../../components";

const FollowTab = () => {
  const {
    auth: {
      userDetails: { username: authUserName },
    },
    user: { users, loading: isUserLoading },
  } = useSelector((state) => state);
  const [searchInput, setSearchInput] = useState("");

  const filteredUsers = users?.filter(
    (user) =>
      (user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchInput.toLowerCase())) &&
      user.username !== authUserName
  );

  return (
    <div className="hidden lg:block dark:bg-slate-800 sticky h-screen top-0 pt-5">
      <input
        type="text"
        placeholder="search"
        className="block w-full p-3 rounded-2xl mb-4 focus:outline-none bg-slate-200 h-10 dark:bg-slate-700"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <div className="bg-slate-100 mt-5 dark:bg-slate-700 rounded-xl pt-3 max-h-[400px] overflow-y-auto">
        <p className="text-xl text-center">Who to follow</p>
        {filteredUsers?.length > 0
          ? filteredUsers?.map((user) => {
              return (
                <HorizontalProfile
                  firstName={user.firstName}
                  lastName={user.lastName}
                  username={user.username}
                  userProfileUrl={user.profileUrl}
                  userId={user._id}
                  followers={user.followers}
                  showFollowBtn={true}
                  key={user._id}
                />
              );
            })
          : !isUserLoading && (
              <h1 className="my-5 text-xl text-center">No user found</h1>
            )}
      </div>
    </div>
  );
};

export { FollowTab };
