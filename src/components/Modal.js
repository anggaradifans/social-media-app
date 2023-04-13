import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center p-24 z-10">
      <div className="bg-white shadow-md rounded-md p-5">{children}</div>
    </div>
  );
};

export default Modal;
