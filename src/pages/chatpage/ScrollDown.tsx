import React, { useEffect, useState } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";
import style from "../../assets/styles/pages/chatpage.module.scss";

type props = {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScrollDown: () => void;
}

const ScrollDown = ({scrollRef, onScrollDown}:props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay before hiding to make the transition smoother
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(false), 200);
        } else {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.8,  // Trigger earlier for smoother experience
        rootMargin: '-20px' // Add a small margin to prevent flickering
      }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, []);
  return (
    <div
      className={`${style.arrow_down} ${isVisible ? style.visible : ''}`}
      onClick={onScrollDown}
    >
      <ArrowDown />
    </div>
  );
};

export default ScrollDown;
