import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack, IoCall, IoMail } from 'react-icons/io5';
import { FaLinkedin } from 'react-icons/fa';
import { UserContext } from '../../UserContext';
import logo from '../../../assets/images/logo.png';
import Footer from '../../Footer';

export const Details = () => {
  const { slug } = useParams();
  const { advisers, loading, error } = useContext(UserContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const backToMain = () => {
    navigate('/');
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

  const selectedAdviser = advisers.find((a) => a.slug === slug);

  if (!selectedAdviser) {
    return <p>No details found for this appointee.</p>;
  }

  const getTrimmedText = (text, maxChars) => {
    if (text.length <= maxChars) return text;
    return text.substring(0, maxChars) + '...';
  };

  const fullBiography = () => (
    <>
      <p>{selectedAdviser.biography}</p>
      {selectedAdviser.qualifications && (
        <p className="mt-4">{selectedAdviser.qualifications}</p>
      )}
    </>
  );

  const truncatedBiography = getTrimmedText(selectedAdviser.biography, 450);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl mt-[90px] mb-[60px] mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
        {/* Left side - Appointee Card */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col">
          <div className="mb-4">
            <IoArrowBack className="text-green-600 cursor-pointer w-6 h-6" onClick={backToMain} />
          </div>
          <h2 className="text-green-600 text-xl font-semibold">{selectedAdviser.name}</h2>
          <p className="text-green-600 text-sm mb-4">{selectedAdviser.appointment_title}</p>
          <div className="border-orange-100 border-[2px] rounded-xl p-2 mb-4">
            <img 
              src={selectedAdviser.photo || logo}
              alt={selectedAdviser.name}
              onError={(e) => (e.target.src = logo)}
              style={{ width: '100%', height: '350px', objectFit: 'cover' }}
            />
          </div>
          <div className="bg-green-600 h-[80px] rounded-xl flex text-center py-3 mb-3 px-5">
            <p className="text-sm self-center text-white">{selectedAdviser?.appointment_position}</p>
          </div>
          <div className="flex justify-center gap-3">
            {selectedAdviser.phone && (
              <div className="bg-gray-200 p-2 rounded-full">
                <a href={`tel:${selectedAdviser.phone}`} className="text-green-600 hover:underline">
                  <IoCall className="text-green-600 w-4 h-4" />
                </a>
              </div>
            )}
            {selectedAdviser.email && (
              <div className="bg-gray-200 p-2 rounded-full">
                <a href={`mailto:${selectedAdviser.email}`} className="text-green-600 hover:underline">
                  <IoMail className="text-green-600 w-4 h-4" />
                </a>
              </div>
            )}
            {selectedAdviser.linkedin && (
              <div className="bg-gray-200 p-2 rounded-full">
                <a href={selectedAdviser.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                  <FaLinkedin className="text-green-600 w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Scrollable Content */}
        <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
          <div className="prose">
            <h3 className="text-xl font-semibold mb-4">Biography / Profile</h3>
            <div>
              {isExpanded ? fullBiography() : truncatedBiography}
            </div>
            <div className="mt-4">
              <button 
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'See less' : 'Read more'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};