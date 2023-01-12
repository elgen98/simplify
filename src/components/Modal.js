import React, { useEffect } from "react";

function Modal({ open, onClose, children }) {
  function escHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("keydown", escHandler);
    }
    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`fixed inset-0 bg-black ${
          open ? "opacity-50" : "pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-in-out`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-0 h-full bg-white shadow-lg w-full max-w-screen-sm p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-in-out`}
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
