import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders Bookstore heading", () => {
    render(<App />)
    expect(screen.getByText(/bookstore/i)).toBeInTheDocument()
})