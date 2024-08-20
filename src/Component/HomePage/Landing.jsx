import { Cards } from "./Card/Card";
import { Filters } from "./Filters/Filters";
import { AppointeeLandingNav } from "./NavBar/NavBar";
import { advisers } from "./Constant";
import { useState } from "react";

function LandingPage() {
  const [adviser, setAdviser] = useState(advisers);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      setAdviser(advisers);
    } else {
      const filteredAdvisers = advisers.filter(
        (adviser) => adviser.position === filter
      );
      setAdviser(filteredAdvisers);
    }
  };

  return (
    <div>
      <div className=" min-w-screen min-h-screen">
        <div className="container flex items-center flex-col">
          <div className="text-center pt-28 flex flex-col items-center justify-center">
            <p className="text-4xl font-semibold p-5 max-w-[1100px]">
              Government Appointed Special Advisers and Special Assistants
            </p>
            <p className="text-xl text-gray-500 max-w-[850px]">
              Meet the team of Special Advisers or Special Assistants appointed
              by the Enugu State Government to provide expert advice, support
              and guidance.
            </p>
          </div>
          <div className="pt-6">
            <Filters onFilterChange={handleFilterChange} />
          </div>
          <div className="p-6 w-full">
            <Cards adviser={adviser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
