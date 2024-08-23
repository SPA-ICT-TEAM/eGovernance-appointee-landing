import React, { useState, useContext } from "react";
import { Cards } from "./Card/Card";
import { Filters } from "./Filters/Filters";
import { UserContext } from "../UserContext";
import logo from "../../assets/images/logo.png"

function LandingPage() {
  const { advisers, loading, error } = useContext(UserContext);
  const [filteredAdvisers, setFilteredAdvisers] = useState(advisers);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      setFilteredAdvisers(advisers);
    } else {
      const filtered = advisers.filter(
        (adviser) => adviser.appointment_title === filter
      );
      setFilteredAdvisers(filtered);
    }
  };

  React.useEffect(() => {
    setFilteredAdvisers(advisers);
  }, [advisers]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <img src={logo} alt="" className="w-28"/>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <img src={logo} alt="" className="w-28"/>
        <p>Error: {error}</p>
      </div>
    );
  }

  const uniqueTitles = ["All", ...new Set(advisers.map(a => a.appointment_title))];

  return (
    <div>
      <div className="min-w-screen min-h-screen">
        <div className="container flex items-center flex-col">
          <div className="text-center pt-28 flex flex-col items-center justify-center">
            <p className="text-4xl font-semibold p-5 max-w-[1100px]">
              Government Appointed Special Advisers and Special Assistants
            </p>
            <p className="text-xl text-gray-500 max-w-[850px]">
              Meet the team of Special Advisers or Special Assistants appointed
              by the Enugu State Government to provide expert advice, support,
              and guidance.
            </p>
          </div>
          <div className="pt-6">
            <Filters onFilterChange={handleFilterChange} filters={uniqueTitles} />
          </div>
          <div className="p-6 w-full">
            <Cards adviser={filteredAdvisers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
