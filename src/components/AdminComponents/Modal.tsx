import React from "react";

interface ModalProps {
  closeModal: () => void;
  attachmentUrl: string;
}

const Modal: React.FC<ModalProps> = ({ closeModal, attachmentUrl }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="bg-white p-16 rounded-lg z-50 relative">
        <button className="absolute top-0 right-0 text-5xl font-sans font-bold p-2 bg-blue-600 m-2 rounded-lg text-white" onClick={closeModal}>
          X
        </button>
        <img src={attachmentUrl} alt="Attachment" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

export default Modal;
