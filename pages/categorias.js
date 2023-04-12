import React, { useEffect, useState } from "react";
import Dashboard from "../components/Layouts/Dashboard";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import CategoryItem from "../components/categories/CategoryItem";
import { ClipLoader } from "react-spinners";
import CreatorHandler from "../components/categories/CreatorHandler";
import { authCookie } from "../utils/getAuthCookie";

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loader, setLoader] = useState(true);
  const [popupOpened, setPopupOpened] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URI}/api/categories/all`)
      .then((res) => {
        setCategories(res.data.categories);
        setLoader(false);
      });
  }, []);

  const deleteCategory = async (id) => {
    setLoader(true);
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URI}/api/categories/delete/id/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: await authCookie(),
          },
        }
      )
      .then(() => {
        setLoader(false);
        setCategories(categories.filter((category) => category._id !== id));
        toast.success("Eliminado exitosamente");
      });
  };

  return (
    <Dashboard>
      {popupOpened && (
        <CreatorHandler
          onClose={() => {
            setPopupOpened(false);
          }}
          setCategories={(category) => setCategories([...categories, category])}
          setLoader={setLoader}
        />
      )}

      <Toaster />
      <div className="w-full h-full flex flex-col py-5 px-1 md:px-5 max-w-[calc(1600px)]">
        <div className="flex h-[calc(8rem)] items-center md:justify-between ">
          <div className="hidden md:flex items-center justify-start w-full">
            <div className="bg-blue-500 w-24 h-24 rounded-full text-white flex items-center justify-center">
              <i className="bx bx-user text-[calc(60px)]"></i>
            </div>
            <div className="md:px-3">
              <p className="font-bold text-xl">Hola!</p>
              <p className=" text-gray-600">Administra tus datos aquí</p>
            </div>
          </div>
          <div
            onClick={() => setPopupOpened(true)}
            className=" bg-blue-500 text-white rounded-[calc(10px)] py-4 px-5 font-semibold flex items-center gap-4 cursor-pointer flex-shrink-0"
          >
            <p>
              <i className="bx bx-plus text-2xl font-extralight"></i>
            </p>
            <p>Agregar Categoría</p>
          </div>
        </div>
        <div className="w-full h-full bg-white main-boxes-shadow mt-5 rounded-2xl flex flex-col gap-4 px-1 md:px-6 py-4 overflow-y-scroll scrollbar">
          {loader ? (
            <div className="w-full h-full flex items-center justify-center">
              {" "}
              <ClipLoader size={150} />
            </div>
          ) : (
            categories.map((i) => (
              <CategoryItem
                key={i._id}
                category={i}
                onDelete={(category) => {
                  deleteCategory(category._id);
                }}
              />
            ))
          )}
          {}
        </div>
      </div>
    </Dashboard>
  );
};

export default Categorias;
