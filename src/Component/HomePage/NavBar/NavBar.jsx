import logo from "../../../assets/images/logo.png";

export const AppointeeLandingNav = () => {
  return (
    <nav className="p-4 bg-green-600 w-full fixed z-50 flex h-[60px] justify-center">
      <div className="container flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-12 text-white cursor-pointer">
            <li className="text-white">Home</li>
            <li className="text-white" >ENSG</li>
          </ul>
          <button className="bg-white px-5 py-1.5 rounded-lg hover:bg-green-700 text-green-600 font-medium">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};
