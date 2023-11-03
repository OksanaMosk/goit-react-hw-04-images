import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#root');

const Modal = ({ alt, src, closeModal }) => {
  useEffect(() => {
    const escPress = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', escPress);

    return () => {
      window.removeEventListener('keydown', escPress);
    };
  }, [closeModal]);

  const backdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={backdropClick}>
      <div className={css.modal}>
        <img className={css.modalPicture} src={src} alt={alt} />
        <p className={css.modalTag}>{alt}</p>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
