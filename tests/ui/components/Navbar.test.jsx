import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui/components/Navbar";

// jest.mock('react-router-dom'); // Así no funciona porque le cae encima al Memory router. Por lo que deja de funcionar nuestras pruebas
const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <Navbar />", () => {
  const contextValue = {
    logged: true,
    user: {
      id: "abc",
      name: "Diana Fernández",
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrar el nombre del usuario", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // screen.debug();

    expect(screen.getByText("Diana Fernández")).toBeTruthy();
  });
  test("debe de llamar el logout y navigate cuando se hace click en el boton", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });

    // Aquí viene la parte nueva. Una prueba que no hemos aplicado antes.
  });
});
