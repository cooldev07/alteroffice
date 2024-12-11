import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton, PrimaryOutlinedButton, ProfileImage } from "../";
import { useDetectClick } from "../../hooks";
import { updateUser, uploadImg } from "../../features";
import toast from "react-hot-toast";

const EditProfileModal = ({ currentUser, setShowEditProfile }) => {
  const dispatch = useDispatch();

  const profileModalRef = useRef(null);

  useDetectClick(profileModalRef, setShowEditProfile);

  const {
    auth: {
      token,
      userDetails: { username },
    },
    user: { users },
  } = useSelector((state) => state);

  const getUserByUserName = (username) =>
    users.filter((user) => user.username === username)[0];

  const userDetails = getUserByUserName(username);

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/test-social-media/image/upload";
  const [updatedValue, setUpdatedValue] = useState(userDetails);
  const [imageUrl, setImageUrl] = useState("");

  const updateUserDetails = async (e) => {
    e.preventDefault();
    if (imageUrl) {
      dispatch(uploadImg());
      setShowEditProfile(false);
      const file = imageUrl;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "social-media");
      formData.append("folder", "social-media");

      try {
        const res = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        const { url } = await res.json();

        dispatch(
          updateUser({
            token,
            userDetails: { ...updatedValue, profileUrl: url },
          })
        );
      } catch (err) {
        toast.error("Something went wrong, please try again.");
        console.error(err);
      }
      setImageUrl("");
    } else {
      dispatch(updateUser({ token, userDetails: updatedValue }));
      setShowEditProfile(false);
    }
  };

  return (
    <div
      className={
        "fixed z-10 inset-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center " +
        (!true ? "hidden" : "")
      }
    >
      <div
        ref={profileModalRef}
        className="bg-grey-lighter min-h-screen flex flex-col "
      >
        <div className="relative container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full dark:bg-slate-900">
            <h1 className="mb-8 text-2xl text-center dark:text-white">
              Edit Profile
            </h1>

            <div className="relative w-24 h-24 m-auto">
              <ProfileImage
                profileUrl={currentUser?.profileUrl}
                firstName={currentUser?.firstName}
                lastName={currentUser?.lastName}
              />

              <label className="absolute right-0 bottom-0 flex justify-center items-center h-9 w-9 bg-black  text-white dark:bg-white dark:text-black rounded-full">
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                />
                <FiCamera className="text-xl cursor-pointer" />
              </label>
            </div>

            <div className="text-black dark:text-white my-4">
              <h4 className="text-xl">User Name</h4>
              <h6>{`${currentUser?.firstName} ${currentUser?.lastName}`}</h6>
            </div>

            <div className="text-black dark:text-white my-4">
              <h4 className="text-xl">User Name</h4>
              <h6>@{currentUser?.username}</h6>
            </div>

            <label>
              <p className="text-black dark:text-white">Bio</p>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="bio"
                value={updatedValue.bio}
                onChange={(e) =>
                  setUpdatedValue((prev) => ({ ...prev, bio: e.target.value }))
                }
              />
            </label>

            <label>
              <p className="text-black dark:text-white">Website</p>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="website"
                value={updatedValue.website}
                onChange={(e) =>
                  setUpdatedValue((prev) => ({
                    ...prev,
                    website: e.target.value,
                  }))
                }
              />
            </label>

            <div className="flex justify-between gap-6 mt-5">
              <PrimaryOutlinedButton
                clickHandler={() => setShowEditProfile(false)}
              >
                Cancel
              </PrimaryOutlinedButton>
              <PrimaryButton clickHandler={updateUserDetails}>
                Update
              </PrimaryButton>
            </div>
            <div className="text-center mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EditProfileModal };
