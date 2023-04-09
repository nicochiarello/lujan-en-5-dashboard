import React from "react";

const CategoryItem = ({ category, onDelete }) => {
  return (
    <div className="w-full py-4 rounded-xl main-boxes-shadow flex justify-between items-center px-2">
      <p>{category.title}</p>
      <div className="flex gap-3">
        <div
          onClick={() =>
            onDelete(category)
          }
          className="px-3 py-2 bg-red-600 rounded-xl cursor-pointer shadow-lg"
        >
          <i className="bx bxs-trash text-2xl text-white"></i>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
