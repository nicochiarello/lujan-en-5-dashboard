import { data } from "autoprefixer";
import React, { useState, useEffect, useRef } from "react";

const Step3 = ({data, onChange}) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  
  return (
    <div className="w-full h-full px-24 flex items-center justify-center">
      <div className="flex justify-center items-center w-full h-full">
        <>
          {preview ? (
            <div className="w-full h-[calc(450px)] bg-gray-600 relative">
              <label
                for="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-[calc(450px)]  rounded-lg border-2  border-dashed cursor-pointer dark:hover:bg-bray-800 bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
              >
                <input
                  ref={fileInputRef}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      setImage(file);
                      onChange({...data, img: file})
                    } else {
                      setImage(null);
                    }
                  }}
                />
              <img
                className="w-full max-h-full object-contain"
                src={preview}
                alt=""
              />
              </label>
   
            </div>
          ) : (
            <label
              for="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-[calc(450px)]  rounded-lg border-2  border-dashed cursor-pointer dark:hover:bg-bray-800 bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click para Subir</span> o
                  arrastrar archivo
                </p>
              </div>
              <input
                ref={fileInputRef}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setImage(file);
                    onChange({...data, img: file})
                  } else {
                    setImage(null);
                  }
                }}
              />
            </label>
          )}
        </>
      </div>
    </div>
  );
};

export default Step3;
