import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../src/Components/Nav"; // ajusta la ruta según tu estructura
import { vi } from "vitest";

// 🔹 Mock de useNavigate para simular la navegación
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 🔹 Mock de Bootstrap Modal
beforeAll(() => {
  window.bootstrap = {
    Modal: {
      getInstance: vi.fn().mockReturnValue({ hide: vi.fn() }),
    },
  };
});

describe("Componente Nav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify([{ id: 1, quantity: 3 }]));
    localStorage.setItem("wishlist", JSON.stringify([{ id: 1 }, { id: 2 }]));
  });

  it("renderiza correctamente el nombre del sitio", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    expect(screen.getAllByText("Huerto Hogar")[0]).toBeInTheDocument();
  });

  it("muestra todos los enlaces principales del menú", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Acerca de")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Tiendas")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("muestra los contadores del carrito y wishlist según localStorage", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    expect(screen.getAllByText("3")[0]).toBeInTheDocument(); 
    expect(screen.getAllByText("2")[0]).toBeInTheDocument(); 
  });

  it("muestra el modal de registro al hacer clic en el icono de persona", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    const modalButton = screen.getAllByRole("link").find(link =>
      link.querySelector(".bi-person")
    );
    expect(modalButton).toBeInTheDocument();
  });

  it("actualiza los contadores cuando cambia el localStorage (evento storage)", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    localStorage.setItem("cart", JSON.stringify([{ id: 1, quantity: 10 }]));
    window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));

    
    expect(screen.getAllByText("3")[0]).toBeInTheDocument();
  });


  it("permite cerrar sesión y remueve el usuario de localStorage", () => {
    
    localStorage.setItem("user", JSON.stringify({ name: "User1", email: "user@test.com" }));

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    
    fireEvent.click(screen.getByText("Cerrar sesión"));

    expect(localStorage.getItem("user")).toBeNull();
  });


  it("muestra nombre de usuario cuando está logueado", () => {
    localStorage.setItem("user", JSON.stringify({ name: "User1", email: "user@test.com" }));

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByText(/User1/i)).toBeInTheDocument();
  });
});
