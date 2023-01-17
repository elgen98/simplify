import { render, screen, cleanup } from "@testing-library/react";
import Modal from "../Modal";

afterEach(() => {
    cleanup();
});

test("should render Modal component", () => {
    render(<Modal open={open} />);
    const ModalElement = screen.getByTestId("modal-1");
    expect(ModalElement).toBeInTheDocument();
});

test("should render children", () => {
    render(<Modal children={<div>Hello World!</div>} />);
    const ModalElement = screen.getByTestId("modal-1");
    expect(ModalElement).toBeInTheDocument();
    expect(ModalElement).toContainHTML("<div>Hello World!</div>");
    expect(ModalElement).toHaveTextContent("Hello World!");
});
