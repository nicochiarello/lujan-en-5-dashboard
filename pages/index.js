import { useState, useRef, useCallback, use, useEffect } from "react";
import Dashboard from "../components/Layouts/Dashboard";
import Modal from "../components/modal/Index";
import parse from "html-react-parser";
import { Toaster, toast } from "react-hot-toast";
import { deleteBlog } from "../utils/api/blogs/blogs.routes";
import axios from "axios";

const Panel = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);

  useEffect(() => {
    let source = axios.CancelToken.source();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URI}/api/blogs?page=${page}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setLoader(false);
        setBlogs((prevBlogs) => {
          return [...new Set([...prevBlogs, ...res.data.blogs])];
        });
        setNbPages(res.data.totalPages);
      })
      .catch((err) => {});

    return () => {
      source.cancel();
    };
  }, [page]);

  const handletoggle = () => {
    setModalOpened(true);
  };

  const observer = useRef();

  const lastBlogChild = useCallback(
    (node) => {
      if (loader) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (page < nbPages) {
            setPage((prev) => prev + 1);
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loader]
  );

  return (
    <Dashboard>
      <Toaster />
      <div className="w-full h-full flex flex-col py-5 px-5 max-w-[calc(1600px)]">
        <div className=" flex pr-10 h-[calc(8rem)] items-center justify-around ">
          <div className="flex items-center justify-start w-full">
            <div className="bg-blue-500 w-24 h-24 rounded-full text-white flex items-center justify-center">
              <i className="bx bx-user text-[calc(60px)]"></i>
            </div>

            <div className="px-3">
              <p className="font-bold text-xl">Hola!</p>
              <p className=" text-gray-600">Administra tus datos aquí</p>
            </div>
          </div>
          <div
            onClick={() => handletoggle()}
            className=" bg-blue-500 text-white rounded-[calc(10px)] py-4 px-5 font-semibold flex items-center gap-4 cursor-pointer flex-shrink-0"
          >
            <p>
              <i className="bx bx-plus text-2xl font-extralight"></i>
            </p>
            <p>Agregar Publicación</p>
          </div>
        </div>
        <div className="w-full h-full bg-white shadow-2xl mt-5 rounded-2xl grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-6 py-4 overflow-y-scroll scrollbar">
          {blogs.map((i, key) => {
            if (blogs.length === key + 1) {
              return (
                <div
                  key={i._id}
                  ref={lastBlogChild}
                  className="relative w-full h-[calc(25rem)] rounded-[calc(35px)] overflow-hidden shadow-2xl overflow-y-scroll px-5 py-2"
                >
                  <h3 className="text-xl font-bold my-3">{i.title}</h3>
                  <p className="text-base my-2 font-medium">{i.copete}</p>
                  <img
                    className="w-full max-h-60 object-cover my-5"
                    src={process.env.NEXT_PUBLIC_IMG_URI + "/" + i.img}
                    alt={i.name}
                  />
                  {parse(i.body)}
                  <div className="absolute h-full py-4 top-0 right-3 flex flex-col gap-2">
                    <div
                      onClick={() => {
                        setModalOpened(true);
                        setType(1);
                        setSelected({ ...i });
                      }}
                      className="px-3 py-2 bg-blue-500 rounded-xl cursor-pointer shadow-lg"
                    >
                      <i className="bx bxs-edit text-2xl text-white"></i>
                    </div>
                    <div
                      onClick={() =>
                        deleteBlog(setLoader, i._id, setBlogs, () =>
                          toast.success("Eliminado exitosamente!")
                        )
                      }
                      className="px-3 py-2 bg-red-600 rounded-xl cursor-pointer shadow-lg"
                    >
                      <i className="bx bxs-trash text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={i._id}
                  className="relative w-full h-[calc(25rem)] rounded-[calc(35px)] overflow-hidden shadow-2xl overflow-y-scroll px-5 py-2"
                >
                  <h3 className="text-xl font-bold my-3">{i.title}</h3>
                  <p className="text-base my-2 font-medium">{i.copete}</p>
                  <img
                    className="w-full max-h-60 object-cover my-5"
                    src={process.env.NEXT_PUBLIC_IMG_URI + "/" + i.img}
                    alt={i.name}
                  />
                  {parse(i.body)}
                  <div className="absolute h-full py-4 top-0 right-3 flex flex-col gap-2">
                    <div
                      onClick={() => {
                        setModalOpened(true);
                        setType(1);
                        setSelected({ ...i });
                      }}
                      className="px-3 py-2 bg-blue-500 rounded-xl cursor-pointer shadow-lg"
                    >
                      <i className="bx bxs-edit text-2xl text-white"></i>
                    </div>
                    <div
                      onClick={() =>
                        deleteBlog(setLoader, i._id, setBlogs, () =>
                          toast.success("Eliminado exitosamente!")
                        )
                      }
                      className="px-3 py-2 bg-red-600 rounded-xl cursor-pointer shadow-lg"
                    >
                      <i className="bx bxs-trash text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          {loader && (
            <div className="w-full h-full py-4 col-span-full flex items-center justify-center">
              <p>Cargando...</p>
            </div>
          )}
        </div>
        {modalOpened && (
          <Modal
            onClose={()=>{
              setType(0)
              setSelected(null)
              setModalOpened(false)
            }}
            blogs={blogs}
            setBlogs={setBlogs}
            setLoader={setLoader}
            initialData={selected}
            type={type}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default Panel;
