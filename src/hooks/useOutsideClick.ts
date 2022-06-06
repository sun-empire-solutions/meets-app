import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleOutsideClick = (ev: MouseEvent) => {
    if (ref.current && !ref.current.contains(ev.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
};

export { useOutsideClick };
