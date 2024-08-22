import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { UserContext } from "../../UserContext";

export const Details = () => {
  const { name } = useParams();
  const { advisers, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  const backToMain = () => {
    navigate(`/`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const selectedAdviser = advisers.find((a) => a.name === name);

  if (!selectedAdviser) {
    return <p>No details found for this appointee.</p>;
  }

  return (
    <div className="details-page relative flex justify-center p-24 bg-gray-50 min-h-screen">
      <div className="relative container flex justify-center gap-16">
        <div
          onClick={backToMain}
          className="absolute top-0 left-0 -mt-20 rounded-full p-3 border border-green-500 cursor-pointer"
        >
          <IoArrowBack className="w-8 h-8" />
        </div>
        <div className="w-[500px] h-[600px] rounded-lg overflow-hidden border-2 border-green-500">
          <img src={selectedAdviser.photo} alt={selectedAdviser.name} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <h1 className="text-4xl">{selectedAdviser.name}</h1>
              <p>{selectedAdviser.appointment_title}</p>
            </div>
            <p className="text-gray-500">
              {selectedAdviser.appointment_position}
            </p>
          </div>
          <div>
            <h2 className="text-2xl">Biography / Profile</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
