import { render, screen } from "@testing-library/react";

test("jest-dom works", () => {
    render(<div>Hello</div>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
});