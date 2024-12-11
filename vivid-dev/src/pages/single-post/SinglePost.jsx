import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Comment,
  ProfileImage,
  Loader,
  PrimaryButton,
  UserListModal,
} from "../../components";
import {
  addLike,
  addBookmark,
  removeLike,
  removeBookmark,
  addComment,
} from "../../features";
import { formatDate, copyPostUrlTOClipboard } from "../../utils";
import { NotFound } from "../not-found/NotFound";

const SinglePost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    user: { users },
    auth: { userDetails: authUserDetails, token },
    post: { posts, loading: isPostLoading },
    bookmark: { bookmarks },
  } = useSelector((state) => state);
  const [showLikedUsers, setShowLikedUsers] = useState(false);
  const [comment, setComment] = useState("");
  const currentPost = posts?.find((post) => post.id === params?.postId);

  const getUserByUserName = (username) =>
    users.filter((user) => user.username === username)[0];
  const currentUserDetails = getUserByUserName(currentPost?.username);

  const handleAddComment = () => {
    if (comment.trim().length > 1) {
      dispatch(
        addComment({
          postId: currentPost?._id,
          token,
          commentData: { content: comment },
        })
      );
      setComment("");
    } else {
      toast.error("Comment cannot be empty.");
    }
  };

  const navigate = useNavigate();

  const redirectToProfile = (event, target) => {
    event.stopPropagation();
    navigate(`/profile/${target}`);
  };

  return (
    <div className="relative">
      <h1 className="text-2xl pt-7 mb-4 pl-3">Post</h1>

      {showLikedUsers && (
        <UserListModal
          userList={currentPost?.likes?.likedBy}
          setShowUserList={setShowLikedUsers}
          noUserMsg={"No likes"}
          title={"Likes"}
        />
      )}

      {isPostLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      ) : currentPost?.content ? (
        <>
          <div className="relative mt-3 rounded-xl p-5">
            <div>
              <div className="flex gap-x-3">
                <div
                  className="w-12 h-12 flex-shrink-0 cursor-pointer"
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
                <div className="flex flex-col">
                  <div
                    className="flex flex-col mb-2 cursor-pointer"
                    onClick={(event) =>
                      redirectToProfile(event, currentUserDetails?.username)
                    }
                  >
                    <p>{`${currentUserDetails?.firstName} ${currentUserDetails?.lastName}`}</p>
                    <p className="text-slate-400">
                      @{currentUserDetails?.username}
                    </p>
                  </div>
                  <div className="my-4">{currentPost?.content}</div>
                  <p className="text-slate-400">
                    {formatDate(currentPost?.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 my-2 p-2 border-y-2 border-slate-300 dark:border-slate-700 ">
                <span>
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() => setShowLikedUsers(true)}
                  >{`${currentPost?.likes.likeCount} Likes`}</span>
                </span>
                <span>
                  <span>{currentPost?.comments?.length} Comments</span>
                </span>
              </div>

              <div className=" flex justify-between pb-2 border-b-2 border-slate-300 dark:border-slate-700 ">
                <div className="flex justify-center gap-1">
                  {currentPost?.likes?.likedBy.find(
                    (user) => user.username === authUserDetails?.username
                  ) ? (
                    <button
                      className="material-icons text-red-500 cursor-pointer"
                      onClick={() =>
                        dispatch(
                          removeLike({ postId: currentPost?._id, token })
                        )
                      }
                    >
                      favorite
                    </button>
                  ) : (
                    <button
                      className="material-icons hover:text-red-500 cursor-pointer"
                      onClick={() =>
                        dispatch(addLike({ postId: currentPost?._id, token }))
                      }
                    >
                      favorite_border
                    </button>
                  )}
                  <p>{currentPost?.likes?.likeCount}</p>
                </div>

                {bookmarks?.find((id) => id === currentPost._id) ? (
                  <button
                    className="material-icons text-blue-500 cursor-pointer"
                    onClick={() =>
                      dispatch(
                        removeBookmark({ token, postId: currentPost?._id })
                      )
                    }
                  >
                    bookmark
                  </button>
                ) : (
                  <button
                    className="material-icons hover:text-blue-500 cursor-pointer"
                    onClick={() =>
                      dispatch(addBookmark({ token, postId: currentPost?._id }))
                    }
                  >
                    bookmark_border
                  </button>
                )}
                <button
                  className="material-icons hover:text-blue-500 cursor-pointer"
                  onClick={() => copyPostUrlTOClipboard(params?.postId)}
                >
                  share
                </button>
              </div>

              <div className="flex justify-between items-center gap-x-6 py-3 border-b-2 border-slate-300 dark:border-slate-700">
                <div className="w-10 h-10 flex-shrink-0">
                  <ProfileImage
                    profileUrl={authUserDetails?.profileUrl}
                    firstName={authUserDetails?.firstName}
                    lastName={authUserDetails?.lastName}
                  />
                </div>
                <input
                  type="text"
                  placeholder="comment"
                  className="block w-full px-3 rounded-2xl
              focus:outline-none bg-slate-200 h-10 dark:bg-slate-700"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <PrimaryButton clickHandler={handleAddComment}>
                  Post
                </PrimaryButton>
              </div>
            </div>
          </div>
          {currentPost?.comments?.map((comment) => (
            <Comment
              key={comment._id}
              commentDetails={comment}
              postId={currentPost._id}
            />
          ))}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export { SinglePost };
