import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectError = error.response && error.response.status >= 400 && error.response.status < 500;
  //   console.log("here Error", error);
  //   console.log(expectError);
  if (!expectError) {
    console.log("Logging the error", error);
    toast.error("Something failed connect the server a post");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
