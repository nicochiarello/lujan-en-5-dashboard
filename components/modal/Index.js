import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Controller from "./stepper/Controller";
import Stepper from "./stepper/Stepper";
import { sendBlog, updateBlog } from "../../utils/api/blogs/blogs.routes";
import { toast } from "react-hot-toast";

const Index = ({ onClose, setLoader, setBlogs, initialData, type }) => {
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
      setData({ ...initialData, category: initialData.category._id });
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
      className=" gradient-bg w-screen h-screen flex justify-center items-center fixed top-0 left-0"
    >
      <div className="w-full h-full max-h-[700px] mx-2 md:w-[calc(1000px)] md:h-[calc(700px)] bg-white rounded-xl overflow-hidden flex flex-col justify-between">
        <div className="w-full h-[calc(95px)] ">
          <Stepper step={step} />
        </div>
        <div className="w-full flex-1">
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
            className={"w-[calc(12rem)] h-[calc(50px)] bg-blue-500 flex transition-all items-center justify-center rounded-xl text-white font-semibold cursor-pointer"}
          >
            {step === 3 ? "Publicar" : "Siguiente"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
