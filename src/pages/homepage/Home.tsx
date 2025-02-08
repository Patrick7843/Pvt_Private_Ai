import { Link, useNavigate } from "react-router-dom";
import style from "../../assets/styles/pages/homepage.module.scss";
import botIMG from "../../assets/images/bot.png";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import humanIMG from "../../assets/images/human.jpeg";
import Logo from "../../assets/icons/Logo";
import { Music, Twitter } from 'lucide-react';

const Home = () => {
  const [botImg, setBotImg] = useState<boolean>(false);
  const [animateExit, setAnimateExit] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGetStartedClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setAnimateExit(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className={`${style.homepage} ${animateExit ? style.fadeOut : ""}`}>
      <div className={style.wrapper}>
        <div className={style.left}>
          <h1>ALVAN AI</h1>
          <h2>Dont Wait Just Join</h2>
          <h3>
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontStyle: 'italic', fontSize: '18px', letterSpacing: '1px', textShadow: '1px 1px 2px #000' }}>
              If you can't log in or sign up, then wait or text Alvan to give you access to this advanced early release AI
            </span>
          </h3>
          <Link to="/dashboard" onClick={handleGetStartedClick}>
            Get Started
          </Link>
        </div>
        <div className={style.right}>
          <div className={style.img_cont}>
            <img
              className={style.bot_img}
              src={botIMG}
              alt=""
              draggable={false}
            />
            <div className={style.chat}>
              <img src={botImg ? botIMG : humanIMG} alt="" draggable={false} />
              
              <TypeAnimation
                sequence={[
                  "What can you do?",
                  2000,
                  () => {
                    setBotImg(true);
                  },
                  "I can assist you with anything you need!",
                  2000,
                  () => {
                    setBotImg(false);
                  },
                  "Can you help me learn?",
                  2000,
                  () => {
                    setBotImg(true);
                  },
                  "Of course! Let's explore together.",
                  2000,
                  () => {
                    setBotImg(false);
                  },
                ]}
                wrapper="span"
                repeat={Infinity}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.terms}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.links}>
          <Link to="https://open.spotify.com/artist/0gArFuWAtmg0jxLJ5Y1a2T">
            <Music size={24} />
          </Link>
          |
          <Link to="https://x.com/alvanalrakib">
            <Twitter size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;