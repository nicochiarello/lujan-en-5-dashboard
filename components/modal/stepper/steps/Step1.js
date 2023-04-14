import React, { useState } from "react";

const Step1 = ({ data, onChange, categories }) => {
  const [maxCharts, setMaxCharts] = useState(100);

  const handleCharacters = (lenght) => {
    setMaxCharts((maxCharts) => maxCharts - lenght);
  };

  return (
    <div className="w-full h-full px-4 m-auto max-w-[50rem] flex flex-col justify-center gap-8">
      <div>
        <label className="block xl:mb-2 text-sm font-medium text-gray-900">
          Título
        </label>
        <input
          type="text"
          value={data.title}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Título"
          onChange={(e) => onChange({ ...data, title: e.target.value })}
        />
      </div>
      <div>
        <label className="block xl:mb-2 text-sm font-medium text-gray-900">
          Copete maximo de caracteres: {maxCharts}
        </label>
        <textarea
          value={data.copete}
          // onChange={(e)=> handleCharacters(e.target.value.length)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Escriba el copete"
          rows={6}
          onChange={(e) => onChange({ ...data, copete: e.target.value })}
        />
      </div>
      <div>
        <label className="block xl:mb-2 text-sm font-medium text-gray-900">
          Categoría
        </label>
        <select
          value={data.category}
          onChange={(e) => onChange({ ...data, category: e.target.value })}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected disabled value="">
            Selecciona una opcion
          </option>
          {categories.map((i) => {
            return (
              <option key={i._id} value={i._id}>
                {i.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Step1;
