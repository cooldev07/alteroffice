import { Loader } from "../";
const LoaderOverlay = () => {
  return (
    <div class="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
      <div class="flex items-center">
        <Loader isFullScreen={true} />
      </div>
    </div>
  );
};

export { LoaderOverlay };
