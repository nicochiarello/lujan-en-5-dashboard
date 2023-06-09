import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Controller from "./stepper/Controller";
import Stepper from "./stepper/Stepper";
import { sendBlog, updateBlog } from "../../utils/api/blogs/blogs.routes";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Index = ({ onClose, loader, setLoader, setBlogs, initialData, type }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URI}/api/categories/all`)
      .then((res) => setCategories(res.data.categories));
  }, []);

  useEffect(() => {
    if (type === 1) {
      setData({ ...initialData, category: initialData.category?._id || null });
    }
  }, [type]);

  const formData = new FormData();

  Object.entries(data).forEach((i) => {
    formData.append(i[0], i[1]);
  });

  const listenerFn = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleStep = (option) => {
    if (option === "plus") {
      if (step >= 3) {
        return;
      } else {
        setStep((prevStep) => prevStep + 1);
      }
    }

    if (option === "minus") {
      if (step <= 1) {
        onClose();
      } else {
        setStep((prevStep) => prevStep - 1);
      }
    }

    if (option === 2) {
      if (type === 0) {
        return sendBlog(
          setLoader,
          formData,
          setBlogs,
          () => onClose(false),
          () => toast.success("Creado exitosamente!")
        );
      }
      if (type === 1) {
        return updateBlog(
          data._id,
          setLoader,
          formData,
          setBlogs,
          () => onClose(false),
          () => toast.success("Editado exitosamente!")
        );
      }
    }
  };

  const modalRef = useRef();

  return (
    <div
      ref={modalRef}
      onClick={listenerFn}
      className=" gradient-bg w-screen py-2 h-screen flex justify-center items-center fixed top-0 left-0"
    >
      <div className="w-full h-full max-h-[650px] mx-2 md:max-w-[calc(900px)] bg-white rounded-xl overflow-hidden flex flex-col justify-between">
        {loader ? (
          <div className="flex flex-1 justify-center items-center">
            <ClipLoader size={150} />
          </div>
        ) : (
          <>
            {" "}
            <div className="w-full h-[calc(95px)] ">
              <Stepper step={step} />
            </div>
            <div className="w-full flex-1 overflow-y-scroll py-3 ">
              <Controller
                step={step}
                data={data}
                onChange={setData}
                categories={categories}
              />
            </div>
            <div className="w-full max-w-[20rem] m-auto h-[calc(80px)] flex justify-center items-center gap-24">
              <div
                onClick={() => handleStep("minus")}
                className=" w-[calc(12rem)] h-[calc(50px)] bg-blue-500 flex items-center justify-center rounded-xl text-white font-semibold cursor-pointer"
              >
                {step === 1 ? "Cerrar" : "Atras"}
              </div>
              <div
                onClick={() => {
                  step !== 3 ? handleStep("plus") : handleStep(2);
                }}
                className={
                  "w-[calc(12rem)] h-[calc(50px)] bg-blue-500 flex transition-all items-center justify-center rounded-xl text-white font-semibold cursor-pointer"
                }
              >
                {step === 3
                  ? (type === 1 && "Editar") || (type === 0 && "Publicar")
                  : "Siguiente"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
