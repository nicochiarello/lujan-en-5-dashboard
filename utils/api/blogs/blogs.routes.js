import axios from "axios";
import { toast } from "react-hot-toast";

export const getAllBlogs = (setLoader, setBlogs, onClose, cb) => {
  axios.get(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs`).then((res) => {
    setBlogs(res.data.blogs);
    if (onClose) {
      onClose();
    }
    setLoader(false);
    cb();
  });
};

export const sendBlog = (setLoader, formData, setBlogs, onClose, cb) => {
  setLoader(true);
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => {
      return getAllBlogs(setLoader, setBlogs, onClose, cb);
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (setLoader) =>{
    setLoader(true)
}

export const deleteBlog = (setLoader, id, setBlogs, cb) => {
  setLoader(true);
  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs/delete/${id}`)
    .then(() => {
      return getAllBlogs(setLoader, setBlogs, null, cb);
    });
};
