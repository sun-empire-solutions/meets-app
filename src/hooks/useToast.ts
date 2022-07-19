import { toast, TypeOptions } from "react-toastify";

const useToast = () => {
  const showToast = (type: TypeOptions, message: string) => {
    toast[type](message);
  };

  return { showToast };
};

export { useToast };
