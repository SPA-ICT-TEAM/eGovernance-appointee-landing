import logo from "../../../assets/images/logo.png";

export const AppointeeLandingNav = () => {
  return (
    <nav className="p-4 bg-green-600 w-full fixed z-50 flex h-[60px] justify-center">
      <div className="container flex justify-between items-center">
        <div>
        <img src={logo} alt="Logo" className="h-14 w-14" />
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-12 text-white cursor-pointer">
            <li className="text-white">Home</li>
            <li className="text-white" >ENSG</li>
          </ul>
          <a href={import.meta.env.VITE_LOGIN_URL}>
              <button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-100 transition-colors">
                  Login
              </button>
          </a>
        </div>
      </div>
    </nav>
  );
};
