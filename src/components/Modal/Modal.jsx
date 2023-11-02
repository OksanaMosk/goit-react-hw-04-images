import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escPress);
  }

  escPress = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  backdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.backdropClick}>
        <div className={css.modal}>
          <img
            className={css.modalPicture}
            src={this.props.src}
            alt={this.props.alt}
          />
          <p className={css.modalTag}>{this.props.alt}</p>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
