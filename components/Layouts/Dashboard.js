import React from "react";

const Dashboard = ({ children }) => {
  return (
    <div className="w-screen h-screen min-h-[calc(50rem)] flex font-montserrat  relative">
      <div className=" hidden md:flex w-[calc(72px)] xl:flex h-full xl:w-[calc(200px)] bg-blue-900 flex-col relative overflow-hidden">
        <div className=" w-full flex gap-2 items-center px-2 pt-4">
          <i className="bx bxs-news text-[calc(30px)] text-white"></i>
          <h1 className="text-[calc(22px)] text-white font-semibold my-3 underline underline-offset-2">
            Luján en 5
          </h1>
        </div>
        <div className=" w-full flex flex-col text-[calc(16px)] text-white font-bold gap-4 py-4 my-10 cursor-pointer">
          <div className="px-3 py-4 rounded-[calc(20px)] flex items-center gap-2">
            <i className="bx bx-spreadsheet text-[calc(22px)]"></i>
            <p>Publicaciones</p>
          </div>
        </div>
        <div className=" w-full flex flex-col text-[calc(15px)] gap-5 text-gray-300 font-bold px-2 absolute bottom-10">
          <div className=" rounded-[calc(16px)] flex items-center gap-3">
            <i className="bx bx-log-out-circle text-[calc(16px)]"></i>
            <p>Cerrar sesión</p>
          </div>
        </div>
      </div>
      <div className="w-[calc(100vw-72px)] xl:w-[calc(100vw-18rem)] h-full ">
        <div className="w-full h-full ml-5 ">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
