import LogoSvg from './Logo.svg';

const Logo = () => {
  return (
    <img 
      src={LogoSvg} 
      alt="Logo"
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default Logo;