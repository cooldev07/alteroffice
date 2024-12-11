import toast from "react-hot-toast";

const copyPostUrlTOClipboard = async (postId) => {
  await navigator.clipboard.writeText(
    `https://the-vivid.netlify.app/posts/${postId}`
  );
  toast.success("Link copied to clipboard");
};
export { copyPostUrlTOClipboard };
