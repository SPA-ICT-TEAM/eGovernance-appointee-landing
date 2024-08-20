import { useState } from "react";

export const Filters = ({ onFilterChange }) => {
  const filters = [
    "All",
    "SAP",
    "SSA",
    "SA",
    "TA",
    "Consultant",
    "Cordinator",
    "Principal Secretary",
    "Director",
  ];

  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Set the active filter
    onFilterChange(filter);  // Call the parent onFilterChange function
  };

  return (
    <div className="p-5 flex items-center justify-center font-bold">
      <div className="flex flex-wrap gap-12 justify-center">
        {filters.map((filter, id) => (
          <div
            key={id}
            className={`p-2 rounded-md min-w-[80px] items-center flex justify-center cursor-pointer transition-all duration-300 ${
              filter === activeFilter
                ? "bg-transparent  hover:border-transparent"
                : "bg-white border border-white hover:border-green-500"
            }`}
            onClick={() => handleFilterClick(filter)} // Use handleFilterClick
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};
