import React, { useEffect, useState } from 'react';
import style from '../assets/styles/components/upgradeDialog.module.scss';

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({ isOpen, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Delay content animation
      timeout = setTimeout(() => setShowContent(true), 100);
    } else {
      document.body.style.overflow = 'unset';
      setShowContent(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const text = "COMING SOON";

  return (
    <div className={`${style.dialogOverlay} ${isOpen ? style.show : ''}`} onClick={onClose}>
      <div 
        className={style.dialogContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.sparkles}>
          {[...Array(6)].map((_, i) => (
            <span key={i} />
          ))}
        </div>
        
        <div className={style.glowingText}>
          <h2>
            {text.split('').map((letter, index) => (
              <span key={index} className={style.letter}>
                {letter}
              </span>
            ))}
          </h2>
        </div>

        <div className={`${style.message} ${showContent ? style.show : ''}`}>
          <p>Stay tuned for exciting new features and upgrades!</p>
        </div>

        <button 
          onClick={onClose}
          className={`${style.closeButton} ${showContent ? style.show : ''}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpgradeDialog;