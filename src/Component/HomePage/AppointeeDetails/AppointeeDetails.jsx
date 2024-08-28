import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack, IoCall, IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { UserContext } from "../../UserContext";
import logo from "../../../assets/images/logo.png";
import Footer from "../../Footer";

export const Details = () => {
  const { name } = useParams();
  const { advisers, loading, error } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [isFullBiographyShown, setIsFullBiographyShown] = useState(false);
  const [maxChars, setMaxChars] = useState(400); 

  const backToMain = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <img src={logo} alt="Logo" className="w-14" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <img src={logo} alt="Logo" className="w-14" />
        <p>Error: {error}</p>
      </div>
    );
  }

  const selectedAdviser = advisers.find((a) => a.name === name);

  if (!selectedAdviser) {
    return <p>No details found for this appointee.</p>;
  }

  const getTrimmedText = (text, maxChars) => {
    if (text.length <= maxChars) return text;
    return text.substring(0, maxChars) + "...";
  };

  const renderQualifications = () => {
    if(selectedAdviser.qualifications) {
       return (
          <p className="mt-4">{selectedAdviser.qualifications}</p>
       )
    }
  }

  const renderExperience = () => {
    if(selectedAdviser.experience) {
       return (
          <p className="mt-4">{selectedAdviser.experience}</p>
       )
    }
  }

  const fullBiography = () => {
    return (
      <>
        <p>{selectedAdviser.biography}</p>
        {renderQualifications()}
        {/* {renderExperience()} */}
      </>
    )
  }

  const biographyToShow = isFullBiographyShown
    ? fullBiography()
    : getTrimmedText(selectedAdviser.biography, maxChars);

    const checkMore = () => {
      return (selectedAdviser.biography.length > maxChars || selectedAdviser.qualifications || selectedAdviser.experience)
    }

    const renderTelephone = () => {
        if(selectedAdviser.phone) {
            return (
                <a href={`tel:${selectedAdviser.phone}`} className="text-green-600 hover:underline">
                  <IoCall className="text-green-600 w-7 h-7" />
                </a>
            );
        }
    }

    const renderMail = () => {
      if(selectedAdviser.email) {
          return (
              <a href={`mailto:${selectedAdviser.email}`} className="text-green-600 hover:underline">
                <IoMail className="text-green-600 w-7 h-7" />
              </a>
          );
      }
    }

    const renderLinkdin = () => {
      if(selectedAdviser.linkedin) {
          return (
              <a href={`http://${selectedAdviser.linkedin}`} className="text-green-600 hover:underline">
                <FaLinkedin className="text-green-600 w-7 h-7" />
              </a>
          );
      }
  }

  return (
    <div id="MainContent" className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-10 py-24 sm:py-16 md:py-24 lg:px-16 xl:px-34">
        <div className=" relative flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16">
          <button
            onClick={backToMain}
            className="absolute top-0 left-[-80px] mt-0 sm:mt-8 rounded-full p-2 sm:p-3 border border-green-500 cursor-pointer"
          >
            <IoArrowBack className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden border-2 border-green-500">
              <img
                src={selectedAdviser.photo || logo}
                alt={selectedAdviser.name}
                onError={(e) => (e.target.src = logo)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <p className="text-green-600">Contact: </p>
              {renderTelephone()}
              {renderMail()}
              {renderLinkdin()}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-4 items-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl">{selectedAdviser.name}</h1>
                <p className="text-sm sm:text-base">{selectedAdviser.appointment_title}</p>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">{selectedAdviser.appointment_position}</p>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-xl sm:text-2xl">Biography / Profile</h2>
              <p className="text-gray-700 text-sm sm:text-base">{biographyToShow}</p>
              {checkMore() && (
                <div>
                  <button
                    onClick={() => setIsFullBiographyShown(!isFullBiographyShown)} 
                    className="p-2 sm:p-3 px-4 sm:px-6 rounded-lg bg-green-600 text-white text-sm sm:text-base"
                  >
                    {isFullBiographyShown ? "See less" : "See more"} 
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

