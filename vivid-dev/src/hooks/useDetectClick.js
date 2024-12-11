import { useEffect } from "react";

const useDetectClick = (ref, handlerFunction) => {
  useEffect(() => {
    const checkOusideClick = (e) => {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        handlerFunction(false);
      }
    };
    document.addEventListener("mousedown", checkOusideClick);
    return () => {
      document.removeEventListener("mousedown", checkOusideClick);
    };
  }, [ref, handlerFunction]);
};

export { useDetectClick };
