import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { PrimaryButton, PrimaryOutlinedButton } from "../";
import { useDetectClick } from "../../hooks";
import { deleteComment, editComment } from "../../features";
import toast from "react-hot-toast";
import { ProfileImage } from "../profileImage/ProfileImage";

const Comment = ({ commentDetails, postId }) => {
  const {
    user: { users },
    auth: {
      userDetails: { username: authUserName },
      token,
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [showPostOptions, setShowPostOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(commentDetails?.content || "");

  const toggleShowOptions = () => {
    setShowPostOptions((prev) => !prev);
  };
  const optionsModalRef = useRef(null);
  const getUserByUserName = (username) =>
    users.filter((user) => user.username === username)[0];

  const currentUserDetails = getUserByUserName(commentDetails?.username);

  useDetectClick(optionsModalRef, setShowPostOptions);

  const handleEditComment = () => {
    if (editInput.trim().length > 0) {
      dispatch(
        editComment({
          postId,
          token,
          commentData: { content: editInput, _id: commentDetails?._id },
        })
      );
      setIsEditing(false);
    } else {
      toast.error("Comment cannot be empty");
    }
  };

  const navigate = useNavigate();

  const redirectToProfile = (event, target) => {
    event.stopPropagation();
    navigate(`/profile/${target}`);
  };

  return (
    <div>
      <div className="relative px-5 pb-4 border-b-2 border-slate-300 dark:border-slate-700">
        {authUserName === currentUserDetails.username && (
          <div
            className="absolute top-1 right-5 cursor-pointer text-2xl"
            onClick={() => toggleShowOptions()}
          >
            <MdOutlineMoreHoriz />
          </div>
        )}

        {showPostOptions && (
          <div
            ref={optionsModalRef}
            className="absolute top-5 right-5 p-2 rounded-lg cursor-pointer bg-slate-200 dark:bg-black"
          >
            <div
              className="flex gap-2 justify-center items-center hover:text-blue-500"
              onClick={() => {
                toggleShowOptions();
                setIsEditing(true);
              }}
            >
              <BsPencil />
              <p>Edit comment</p>
            </div>
            <div
              className="flex gap-2 justify-center items-center mt-2 hover:text-red-600"
              onClick={() => {
                dispatch(
                  deleteComment({
                    postId,
                    token,
                    commentId: commentDetails?._id,
                  })
                );
                toggleShowOptions();
              }}
            >
              <BsTrash />
              <p>Delete comment</p>
            </div>
          </div>
        )}

        <div className="flex gap-x-2 mt-2">
          <div
            className="w-12 h-12 flex-shrink-0 cursor-pointer "
            onClick={(event) =>
              redirectToProfile(event, currentUserDetails?.username)
            }
          >
            <ProfileImage
              profileUrl={currentUserDetails?.profileUrl}
              firstName={currentUserDetails?.firstName}
              lastName={currentUserDetails?.lastName}
            />
          </div>
          <div className="flex flex-col w-[100%]">
            <div
              className="flex flex-col mb-2 cursor-pointer"
              onClick={(event) =>
                redirectToProfile(event, currentUserDetails?.username)
              }
            >
              <p>{`${currentUserDetails?.firstName} ${currentUserDetails?.lastName}`}</p>
              <p className="text-slate-400">@{currentUserDetails?.username}</p>
            </div>
            {isEditing ? (
              <div className="flex gap-7 justify-between">
                <input
                  type="text"
                  placeholder="comment"
                  className=" w-full px-3 rounded-2xl
        focus:outline-none bg-slate-200 h-10 dark:bg-slate-700"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <PrimaryButton clickHandler={handleEditComment}>
                  Update
                </PrimaryButton>
                <PrimaryOutlinedButton clickHandler={() => setIsEditing(false)}>
                  Cancel
                </PrimaryOutlinedButton>
              </div>
            ) : (
              <>
                <div className="my-1">{commentDetails?.content}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Comment };
