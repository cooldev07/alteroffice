import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { HorizontalProfile } from "../";
import { useDetectClick } from "../../hooks";

const UserListModal = ({ title, userList, setShowUserList, noUserMsg }) => {
  const uerListRef = useRef(null);

  useDetectClick(uerListRef, setShowUserList);

  return (
    <div class="absolute z-10 w-full flex items-center justify-center h-[100vh] ">
      <div
        ref={uerListRef}
        class="relative bg-slate-200 dark:bg-slate-700 px-10 py-5 rounded-3xl w-[300px] max-h-[400px] overflow-y-auto"
      >
        <MdClose
          className="absolute top-2 right-3 text-2xl cursor-pointer"
          onClick={() => setShowUserList(false)}
        />
        <h1 className="text-center text-3xl mb-3 pt-7">{title}</h1>
        <div className="flex flex-col justify-center ap-y-3">
          {userList?.length > 0 ? (
            userList?.map((user) => (
              <HorizontalProfile
                firstName={user.firstName}
                lastName={user.lastName}
                username={user.username}
                userProfileUrl={user.profileUrl}
                userId={user._id}
                followers={user.followers}
              />
            ))
          ) : (
            <p className="text-center">{noUserMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { UserListModal };
