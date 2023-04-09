import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
// import {
//   createInventoryPrice,
//   updateInventoryPrice,
// } from "../../../../utils/api/inventory/prices/routes";
// import Popup from "../../../popup/Popup";
// import SearchPopup from "../../../popup/searchPopup/SearchPopup";

const CreatorHandler = ({
  onClose,
  setCategories,
  setLoader,
}) => {
  const [category, setCategory] = useState("");
  const ref = useRef();

  const handleClose = (e) => {
    if (e.target === ref.current) {
      onClose();
    }
  };

  const onCreate = () => {
    setLoader(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URI}/api/categories/create`, {
        title: category,
      })
      .then((res) => {
        setCategories(res.data);
        setLoader(false);
        toast.success("Creado exitosamente");
        onClose();
      })
      .catch((err) => {
        toast.error("Error!");
      });
  };

  return (
    <>
      <div
        onClick={handleClose}
        ref={ref}
        className="absolute w-screen h-screen top-0 left-0 gradient-bg flex items-center justify-center"
      >
        <div className="rounded-2xl w-full max-w-[600px] h-[300px] bg-white flex flex-col justify-between overflow-hidden">
          <div className="w-full bg-gray-300 py-3 text-black px-4 font-semibold">
            <p>Crear categoría</p>
          </div>
          <div className="w-full flex-1 flex flex-col px-4 py-2 gap-1">
            <label>Categoría</label>
            <input
              type="text"
              className="rounded-xl border px-2 py-1 "
              placeholder="Categoría "
              onChange={(e) =>
                setCategory(e.target.value)
              }
              value={category}
            />
          </div>
          <div
            onClick={() => {
              onCreate();
            }}
            className="w-full bg-blue-500 py-3 text-white font-semibold text-center cursor-pointer"
          >
            <p>Crear</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorHandler;
