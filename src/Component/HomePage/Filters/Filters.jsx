import React, { useState } from "react";

export const Filters = ({ onFilterChange, filters }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter); 
  };

  return (
    <div className="p-5 flex items-center justify-center font-bold">
      <div className="flex flex-wrap gap-12 justify-center">
        {filters.map((filter, id) => (
          <div
            key={id}
            className={`p-2 rounded-md min-w-[80px] items-center flex justify-center cursor-pointer transition-all duration-300 ${
              filter === activeFilter
                ? ""
                : "bg-white border border-white hover:border-green-500"
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};
