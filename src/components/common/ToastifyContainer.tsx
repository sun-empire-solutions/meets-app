import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      theme="colored"
      style={{ opacity: 0.9 }}
    />
  );
};

export { ToastifyContainer };
