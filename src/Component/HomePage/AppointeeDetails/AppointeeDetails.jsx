import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { UserContext } from "../../UserContext";
import logo from "../../../assets/images/logo.png";

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

  const biographyToShow = isFullBiographyShown
    ? selectedAdviser.biography
    : getTrimmedText(selectedAdviser.biography, maxChars);

  return (
    <div className="details-page relative flex justify-center pt-44 p-24 bg-gray-50 min-h-screen">
      <div className="relative container flex justify-center gap-16">
        <div
          onClick={backToMain}
          className="absolute top-0 left-0 -mt-20 rounded-full p-3 border border-green-500 cursor-pointer"
        >
          <IoArrowBack className="w-8 h-8" />
        </div>
        <div className="w-[500px] max-h-[600px] rounded-lg overflow-hidden border-2 border-green-500">
          <img
            src={selectedAdviser.photo || logo}
            alt={selectedAdviser.name}
            onError={(e) => (e.target.src = logo)}
            className="size-full"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <h1 className="text-4xl">{selectedAdviser.name}</h1>
              <p>{selectedAdviser.appointment_title}</p>
            </div>
            <p className="text-gray-500">{selectedAdviser.appointment_position}</p>
          </div>
          <div className="w-[400px] flex flex-col gap-5">
            <h2 className="text-2xl">Biography / Profile</h2>
            <p className="text-gray-700">{biographyToShow}</p>
            {selectedAdviser.biography.length > maxChars && (
              <div>
                <button
                  onClick={() => setIsFullBiographyShown(!isFullBiographyShown)} 
                  className="p-3 px-6 rounded-lg bg-green-600 text-white"
                >
                  {isFullBiographyShown ? "See less" : "See more"} 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// import { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import { UserContext } from "../../UserContext";
// import logo from "../../../assets/images/logo.png";
// import formatter from 'html-formatter'; 

// export const Details = () => {
//   const { name } = useParams();
//   const { advisers, loading, error } = useContext(UserContext);
//   const navigate = useNavigate();
  
//   const [isFullBiographyShown, setIsFullBiographyShown] = useState(false);
//   const [maxChars, setMaxChars] = useState(400); 

//   const backToMain = () => {
//     navigate("/");
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col h-screen items-center justify-center">
//         <img src={logo} alt="Logo" className="w-14" />
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col h-screen items-center justify-center">
//         <img src={logo} alt="Logo" className="w-14" />
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   const selectedAdviser = advisers.find((a) => a.name === name);

//   if (!selectedAdviser) {
//     return <p>No details found for this appointee.</p>;
//   }

//   const getTrimmedText = (text, maxChars) => {
//     if (text.length <= maxChars) return text;
//     return text.substring(0, maxChars) + "...";
//   };

//   const biographyToShow = isFullBiographyShown
//     ? selectedAdviser.biography
//     : getTrimmedText(selectedAdviser.biography, maxChars);

//   const formattedBiography = formatter.render(biographyToShow);

//   return (
//     <div className="details-page relative flex justify-center pt-44 p-24 bg-gray-50 min-h-screen">
//       <div className="relative container flex justify-center gap-16">
//         <div
//           onClick={backToMain}
//           className="absolute top-0 left-0 -mt-20 rounded-full p-3 border border-green-500 cursor-pointer"
//         >
//           <IoArrowBack className="w-8 h-8" />
//         </div>
//         <div className="w-[500px] max-h-[600px] rounded-lg overflow-hidden border-2 border-green-500">
//           <img
//             src={selectedAdviser.photo || logo}
//             alt={selectedAdviser.name}
//             onError={(e) => (e.target.src = logo)}
//             className="size-full"
//           />
//         </div>
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col gap-2">
//             <div className="flex gap-4 items-center">
//               <h1 className="text-4xl">{selectedAdviser.name}</h1>
//               <p>{selectedAdviser.appointment_title}</p>
//             </div>
//             <p className="text-gray-500">{selectedAdviser.appointment_position}</p>
//           </div>
//           <div className="w-[400px] flex flex-col gap-5">
//             <h2 className="text-2xl">Biography / Profile</h2>
//             <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: formattedBiography }} />
//             {selectedAdviser.biography.length > maxChars && (
//               <div>
//                 <button
//                   onClick={() => setIsFullBiographyShown(!isFullBiographyShown)} 
//                   className="p-3 px-6 rounded-lg bg-green-600 text-white"
//                 >
//                   {isFullBiographyShown ? "See less" : "See more"} 
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

