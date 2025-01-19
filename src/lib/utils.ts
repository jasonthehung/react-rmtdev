import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    toast.error(error.message);
  }
};
