import stateLogo from '../../assets/images/logo.png';

function SplashLoader() {
  return (
    <div className='fixed left-0 top-0 h-full w-full z-50 flex items-center justify-center bg-[#0000009e]'>
      <img
        src={stateLogo}
        alt='Logo'
        className='h-30 object-contain animate-scale-in-out'
      />
    </div>
  );
}

export default SplashLoader;
