import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, PrimaryOutlinedButton, ProfileImage } from "../";
import { followUser, unFollowUser } from "../../features";

const HorizontalProfile = ({
  firstName,
  lastName,
  username,
  userProfileUrl,
  userId,
  followers,
  showFollowBtn,
}) => {
  const { userDetails: authUserDetails, token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between items-center gap-x-3 p-2 my-3 cursor-pointer rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600"
      onClick={() => navigate(`/profile/${username}`)}
    >
      <div className="flex gap-3">
        <div className="w-12 h-12">
          <ProfileImage
            profileUrl={userProfileUrl}
            firstName={firstName}
            lastName={lastName}
          />
        </div>
        <div className="flex flex-col gap-y-0">
          <p>{`${firstName} ${lastName}`}</p>
          <p className="text-slate-400">@{username}</p>
        </div>
      </div>

      {showFollowBtn ? (
        followers.find(
          (user) => user.username === authUserDetails?.username
        ) ? (
          <PrimaryOutlinedButton
            clickHandler={(e) => {
              e.stopPropagation();
              dispatch(unFollowUser({ idToUnFollow: userId, token }));
            }}
          >
            Unfollow
          </PrimaryOutlinedButton>
        ) : (
          <PrimaryButton
            clickHandler={(e) => {
              e.stopPropagation();
              dispatch(followUser({ idToFollow: userId, token }));
            }}
          >
            Follow
          </PrimaryButton>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export { HorizontalProfile };
