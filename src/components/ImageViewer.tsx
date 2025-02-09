import { useEffect } from 'react';
import style from '../assets/styles/components/imageViewer.module.scss';
import XIcon from '../assets/icons/XIcon';

interface ImageViewerProps {
  imageUrl: string;
  onClose: () => void;
  isOpen: boolean;
}

const ImageViewer = ({ imageUrl, onClose, isOpen }: ImageViewerProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.content} onClick={e => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          <XIcon />
        </button>
        <img src={imageUrl} alt="Full screen view" className={style.image} />
      </div>
    </div>
  );
};

export default ImageViewer;