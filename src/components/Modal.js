import React, { useEffect } from "react";
import { GrClose } from "react-icons/gr";

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
        <div
            data-testid="modal-1"
            className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}
        >
            <div
                className={`fixed inset-0 bg-black ${
                    open ? "opacity-50" : "pointer-events-none opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                onClick={onClose}
            />

            <div
                className={`fixed inset-0 h-full bg-white shadow-lg w-full max-w-screen-sm p-4 mx-auto scroll-smooth overflow-x-hidden overflow-y-auto ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                } transition-opacity duration-300 ease-in-out`}
            >
                <div className="flex flex-row justify-end">
                    <button onClick={onClose}>
                        <GrClose />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
