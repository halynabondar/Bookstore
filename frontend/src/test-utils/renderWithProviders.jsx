import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../context/index.js";

export function renderWithProviders(ui, { route = "/" } = {}) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <UserProvider>{ui}</UserProvider>
        </MemoryRouter>
    );
}