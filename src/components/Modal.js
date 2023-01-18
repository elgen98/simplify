import React, { useEffect } from "react";
import { GrClose } from "react-icons/gr";

function Modal({ open, onClose, children }) {
    //Escape key handling
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
    // HTML //
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
                className={`fixed inset-0 h-full flex flex-col items-center justify-center gap-8 bg-nice-orange shadow-lg w-full max-w-screen-sm p-4 mx-auto scroll-smooth overflow-x-hidden overflow-y-auto ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                } transition-opacity duration-300 ease-in-out`}
            >
                <div className="flex flex-row w-full justify-end mr-32">
                    <button
                        className="px-3 py-3 bg-red-600 rounded-full"
                        onClick={onClose}
                    >
                        <GrClose />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
