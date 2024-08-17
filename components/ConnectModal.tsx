import { MouseEventHandler } from 'react';


interface ModalProps {
  show:boolean;
  onClose?: MouseEventHandler<HTMLSpanElement>;
}

const Modal: React.FC<ModalProps>  = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>This is a modal!</p>
      </div>
    </div>
  );
};



export default Modal;
