import { BsPencil } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openPostModal } from "../../features";

const CreatePostBtn = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed bottom-[85px] z-10 right-5 flex justify-center items-center bg-blue-500 w-12 h-12 rounded-full text-2xl sm:hidden"
      onClick={() => dispatch(openPostModal())}
    >
      <BsPencil />
    </div>
  );
};

export { CreatePostBtn };
