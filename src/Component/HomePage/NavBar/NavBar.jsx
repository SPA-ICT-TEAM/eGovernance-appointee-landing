import logo from "../../../assets/images/logo.png";

export const AppointeeLandingNav = () => {
  return (
    <nav className="p-4 bg-white sticky w-full z-50 flex justify-center">
      <div className="container flex justify-between">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-12 text-white cursor-pointer">
            <li className="text-green-500">Home</li>
            <li className="text-green-500" >ENSG</li>
          </ul>
          {/* <button className="bg-green-500 p-3 rounded-xl hover:bg-green-700 text-white font-bold ">
            {" "}
            Login{" "}
          </button> */}
        </div>
      </div>
    </nav>
  );
};
