import React from "react";

const Stepper = ({ step }) => {
  const stepperData = [
    {
      step: 1,
      name: "Datos principales",
      noActiveClass:
        "h-12 w-12 rounded-full flex items-center justify-center border-2 border-blue-400 transition-all duration-300",
      activeClass:
        "h-12 w-12 rounded-full flex items-center justify-center border bg-blue-600 border-gray-300 transition-all duration-300",
    },
    {
      step: 2,
      name: "Cuerpo de la nota",
      noActiveClass:
        "h-12 w-12 rounded-full flex items-center justify-center border-2 border-blue-400 transition-all duration-300",
      activeClass:
        "h-12 w-12 rounded-full flex items-center justify-center border bg-blue-600 border-gray-300 transition-all duration-300",
    },
    {
      step: 3,
      name: "Foto",
      noActiveClass:
        "h-12 w-12 rounded-full flex items-center justify-center border-2 border-blue-400 transition-all duration-300",
      activeClass:
        "h-12 w-12 rounded-full flex items-center justify-center border bg-blue-600 border-gray-300 transition-all duration-300",
    },
  ];
  return (
    <div className=" flex w-full px-4 h-full max-w-[35rem] m-auto items-center ">
      {stepperData.map((i, key) => {
        return (
          <>
            <div className="relative flex items-center justify-center">
              {step === i.step ? (
                <div className="h-12 w-12 rounded-full flex items-center justify-center border-2 bg-white border-blue-400 transition-all duration-300">
                  {i.step}
                </div>
              ) : (
                <div
                  className={
                    step > i.step
                      ? " h-12 w-12 rounded-full flex items-center justify-center border bg-blue-600 border-gray-300 transition-all duration-300"
                      : " h-12 w-12 rounded-full flex items-center justify-center border-2 border-gray-200 transition-all duration-300"
                  }
                >
                  {step > i.step ? (
                    <i className="bx bx-check text-2xl text-white"></i>
                  ) : (
                    i.step
                  )}
                </div>
              )}

              <div className="hidden absolute top-[calc(3.5rem)] sm:flex w-[calc(10rem)] text-center justify-center">
                {i.name}
              </div>
            </div>
            {key < stepperData.length - 1 && (
              <div
                className={
                  step > i.step
                    ? " border-t-2 flex-auto border-blue-400 bg-blue-400 transition-all duration-300"
                    : "border-t-2 flex-auto transition-all duration-300"
                }
              ></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
