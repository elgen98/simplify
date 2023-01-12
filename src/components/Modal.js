import React from "react";

function Modal({ open, onClose, children }) {
  return (
    <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`fixed inset-0 bg-black ${
          open ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-0 h-full bg-white shadow-lg w-full max-w-screen-sm p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div>
          <button onClick={onClose}>Click to close modal</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
