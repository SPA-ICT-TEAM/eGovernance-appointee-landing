import logo from "../assets/images/logo.png";
import footerImg from "../assets/images/footer.svg";

const Footer = () => {
    return (
        <footer className="bg-green-900 w-screen px-20" style={{ backgroundImage: `url(${footerImg})`, backgroundSize: 'cover' }}>
            <div className="relative mx-10 px-20 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                    <a className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4" href="#MainContent">
                        <span className="sr-only">Back to top</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div className="flex justify-center text-teal-600 lg:justify-start">
                            <a href="/">
                                <img className="" src={`${logo}`} alt="" width="100px" />
                            </a>
                        </div>
                        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-green-200 lg:text-left">Enugu State: Tomorrow is Here!</p>
                    </div>
                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                        <li>
                            <a className="text-green-100 transition hover:text-yellow-400/75" href="https://enugustate.gov.ng">ENSG MAIN SITE </a>
                        </li>
                    </ul>
                </div>
                <p className="mt-12 text-center text-sm text-green-100 lg:text-right">© 2024 ENUGU STATE GOVERNMENT. All rights reserved.</p>
            </div>
      </footer>
    );
}

export default Footer;