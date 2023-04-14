import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Dashboard = ({ children }) => {
  const router = useRouter();
  const path = router.asPath;

  const [categories, setCategories] = useState(false);

  return (
    <div className="w-screen min-h-screen md:h-screen xl:min-h-[calc(50rem)] flex flex-col md:flex-row font-montserrat relative">
      <Head>
        <title>Lujan En 5 Dashboard</title>
      </Head>
      <div className=" md:flex w-full md:h-full xl:flex h-fit md:w-[calc(200px)] bg-blue-700 flex-col relative overflow-hidden">
        <div className=" w-full flex justify-between items-center h-[4rem] px-2">
          <div className="flex gap-2 items-center">
            <i className="bx bxs-news text-[calc(30px)] text-white"></i>
            <h1 className="text-[calc(22px)] text-white font-bold my-3">
              Luján en 5
            </h1>
          </div>
          <i onClick={()=> setCategories(!categories)} className={`${categories ? "bx bx-x" : "bx bx-menu"}  text-[calc(30px)] text-white md:hidden`}></i>
        </div>
        <div
          className={`${
            categories ? "flex" : "hidden"
          } w-full md:flex flex-col text-[calc(16px)] text-white font-bold gap-1 py-4 my-10 cursor-pointer`}
        >
          <Link
            href={"/dashboard/blogs"}
            className={`mx-2 px-2 py-3 rounded-[calc(20px)] flex items-center gap-2 ${
              path.includes("/blogs") && "bg-white text-blue-600"
            }`}
          >
            <i className="bx bx-spreadsheet text-[calc(22px)]"></i>
            <p>Publicaciones</p>
          </Link>

          <Link
            href={"/dashboard/categorias"}
            className={`mx-2 px-2 py-3 rounded-[calc(20px)] flex items-center gap-2 ${
              path.includes("/categorias") && "bg-white text-blue-600"
            }`}
          >
            <i className="bx bx-category text-[calc(22px)]"></i>
            <p>Categorías</p>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[calc(100vw-200px)] flex-1 overflow-x-hidden">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
