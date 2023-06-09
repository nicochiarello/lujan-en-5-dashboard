import axios from "axios";
import { toast } from "react-hot-toast";
import { authCookie } from "../../getAuthCookie";

export const getAllBlogs = (setLoader, setBlogs, onClose, cb) => {
  axios.get(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs`).then((res) => {
    setBlogs(res.data.blogs);
    if (onClose) {
      onClose();
    }
    setLoader(false);
    if (cb) {
      cb();
    }
  });
};

export const sendBlog = async (setLoader, formData, setBlogs, onClose, cb) => {
  setLoader(true);
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: await authCookie(),
      },
    })
    .then(() => {
      return getAllBlogs(setLoader, setBlogs, onClose, cb);
    })
    .catch((err) => {
      onClose();
      toast.error("Error");
      setLoader(false);
    });
};

export const updateBlog = async (
  id,
  setLoader,
  formData,
  setBlogs,
  onClose,
  cb
) => {
  setLoader(true);
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URI}/api/blogs/update/id/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: await authCookie(),
        },
      }
    )
    .then(() => {
      return getAllBlogs(setLoader, setBlogs, onClose, cb);
    })
    .catch((err) => {
      onClose();
      toast.error("Error");
      setLoader(false);
    });
};

export const deleteBlog = async (setLoader, id, setBlogs, cb) => {
  setLoader(true);
  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs/delete/${id}`, {
      headers: {
        Token: await authCookie(),
      },
    })
    .then(() => {
      return getAllBlogs(setLoader, setBlogs, null, cb);
    });
};
