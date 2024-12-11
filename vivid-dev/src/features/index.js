import authReducer, { signOut } from "./auth/authSlice";
import userReducer, { uploadImg, toggleTheme } from "./user/userSlice";
import postReducer, {
  openPostModal,
  closePostModal,
  setEditingPost,
} from "./post/postSlice";
import bookmarkReducer from "./bookmark/bookmarkSlice";

export { signInUser, signUpUser } from "./auth/helpers";
export { getUsers, followUser, unFollowUser, updateUser } from "./user/helpers";
export {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  addLike,
  removeLike,
  addComment,
  editComment,
  deleteComment,
} from "./post/helpers";
export {
  getAllBookmarks,
  addBookmark,
  removeBookmark,
} from "./bookmark/helper";
export {
  authReducer,
  signOut,
  userReducer,
  uploadImg,
  postReducer,
  openPostModal,
  closePostModal,
  toggleTheme,
  setEditingPost,
  bookmarkReducer,
};
