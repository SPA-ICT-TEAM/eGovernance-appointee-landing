import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../../assets/images/logo.png";

export const AppointeeLandingNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="p-4 bg-green-600 w-full fixed z-50 flex h-[65px] justify-center">
      <div className="container flex justify-between items-center pt-2 pb-2 ">
        <div>
          <Link to="/" onClick={() => handleItemClick("/")}>
            <img src={logo} alt="Logo" className="h-14 w-13" />
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <button className="text-white md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <ul className={`flex items-center gap-12 text-white cursor-pointer ${isMobileMenuOpen ? 'flex-col fixed inset-0 bg-green-600 justify-center' : 'hidden md:flex'}`}>
            <li className="text-center"><Link to="/" className="text-white" onClick={() => handleItemClick("/")}>Home</Link></li>
            <li className="text-center"><a href="https://enugustate.gov.ng" target="_blank" rel="noopener noreferrer" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>ENSG</a></li>
            <li className="text-center mt-8 md:mt-0"><a href={import.meta.env.VITE_LOGIN_URL} onClick={() => setIsMobileMenuOpen(false)}>
              <button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-100 transition-colors">
                Login
              </button>
            </a></li>
          </ul>
          {isMobileMenuOpen && (
            <button className="text-white fixed top-4 right-4" onClick={toggleMobileMenu}>
              <FaTimes size={24} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};