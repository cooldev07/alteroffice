import { useRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  closePostModal,
  createPost,
  editPost,
  setEditingPost,
} from "../../features";
import {
  PrimaryButton,
  PrimaryOutlinedButton,
  ProfileImage,
  Loader,
} from "../";
import toast from "react-hot-toast";

const CreatePostModal = () => {
  const dispatch = useDispatch();

  const {
    auth: { userDetails: authUserDetails, token },
    user: { uploadingImg },
    post: { showPostModal, editingPost },
  } = useSelector((state) => state);

  const [postModalInput, setPostModalInput] = useState("");

  const handlePost = (event) => {
    event.preventDefault();
    if (postModalInput?.trim().length > 0) {
      dispatch(createPost({ postData: { content: postModalInput }, token }));
      dispatch(closePostModal());
      setPostModalInput("");
    } else {
      toast.error("Post cannot be empty");
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(closePostModal());
    dispatch(
      editPost({
        postData: { content: postModalInput },
        token,
        postId: editingPost?._id,
      })
    );
    dispatch(setEditingPost({}));
  };

  const modalBoxRef = useRef(null);

  const textAreaRef = useRef(null);

  const focusHandler = () => {
    textAreaRef.current && textAreaRef.current.focus();
  };
  useEffect(() => {
    focusHandler();
  });
  useEffect(() => {
    setPostModalInput(editingPost?.content);
  }, [editingPost]);

  useEffect(() => {
    const checkOusideClick = (e) => {
      if (
        modalBoxRef &&
        modalBoxRef.current &&
        !modalBoxRef.current.contains(e.target)
      ) {
        dispatch(closePostModal());
      }
    };
    document.addEventListener("mousedown", checkOusideClick);
    return () => {
      document.removeEventListener("mousedown", checkOusideClick);
    };
  }, [modalBoxRef, dispatch]);

  return (
    <div
      className={
        "fixed z-10 inset-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center " +
        (!showPostModal ? "hidden" : "")
      }
    >
      <div
        ref={modalBoxRef}
        className="relative px-2 sm:px-5 pt-10 pb-3 sm:py-8 border-lighter flex w-[90%] sm:w-[80%] max-w-[900px] bg-slate-100 dark:bg-slate-800 rounded-xl"
      >
        <MdClose
          className="absolute top-1 right-1 text-2xl cursor-pointer"
          onClick={() => dispatch(closePostModal())}
        />
        <div className="flex-none mt-3 h-12 w-12">
          {uploadingImg ? (
            <Loader />
          ) : (
            <ProfileImage
              profileUrl={authUserDetails?.profileUrl}
              firstName={authUserDetails?.firstName}
              lastName={authUserDetails?.lastName}
            />
          )}
        </div>
        <form className="w-full px-4 relative">
          <textarea
            ref={textAreaRef}
            placeholder="Write something interesting"
            className="resize-none mt-3 pb-3 w-full h-28 bg-slate-200 focus:outline-none rounded-xl p-2 dark:bg-slate-700"
            value={postModalInput}
            onChange={(e) => setPostModalInput(e.target.value)}
          />
          <div className="flex gap-5 justify-end mt-2">
            <PrimaryOutlinedButton
              clickHandler={(e) => {
                e.preventDefault();
                dispatch(closePostModal());
                dispatch(setEditingPost({}));
              }}
            >
              Cancel
            </PrimaryOutlinedButton>
            {editingPost?.content ? (
              <PrimaryButton clickHandler={handleEdit}>Update</PrimaryButton>
            ) : (
              <PrimaryButton clickHandler={handlePost}>Post</PrimaryButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreatePostModal };
