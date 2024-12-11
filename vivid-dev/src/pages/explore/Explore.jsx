import { useSelector } from "react-redux";
import { Loader, Post } from "../../components";

const Explore = () => {
  const { posts, loading: isPostLoading } = useSelector((state) => state.post);
  return (
    <div>
      <h1 className="text-2xl pt-7 mb-4 pl-5">Explore</h1>
      {isPostLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      ) : (
        posts.map((post) => <Post postDetails={post} key={post._id} />)
      )}
    </div>
  );
};

export { Explore };
