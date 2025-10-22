import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Wishlist from "../src/Pages/Wishlist";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

window.dispatchEvent = vi.fn();

describe("Componente Wishlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("muestra mensaje cuando la lista de deseos está vacía", () => {
    window.localStorage.getItem
      .mockReturnValueOnce(JSON.stringify([])) // wishlist
      .mockReturnValueOnce(JSON.stringify([])); // cart

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(screen.getByText("Tu lista de deseos está vacía.")).toBeInTheDocument();
    expect(screen.getByText("Explorar Productos")).toBeInTheDocument();
  });

  it("muestra correctamente los productos de la lista", async () => {
    const wishlistMock = [
      { id: 1, Productname: "Manzanas", price: 1200, image: "apple.jpg", tag: "New" },
      { id: 2, Productname: "Peras", price: 1000, image: "pear.jpg", tag: "Sale" },
    ];

    window.localStorage.getItem
      .mockReturnValueOnce(JSON.stringify(wishlistMock)) // wishlist
      .mockReturnValueOnce(JSON.stringify([])); // cart

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(await screen.findByText("Manzanas")).toBeInTheDocument();
    expect(screen.getByText("Peras")).toBeInTheDocument();
    expect(screen.getByText("$1200")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();

    // Verifica que los badges de tag se muestren
    const badges = document.querySelectorAll(".badge");
    expect(badges.length).toBe(2);
    expect(badges[0].textContent).toBe("New");
    expect(badges[1].textContent).toBe("Sale");
  });

  it("permite eliminar un producto de la lista de deseos", async () => {
    const wishlistMock = [
      { id: 1, Productname: "Manzanas", price: 1200, image: "apple.jpg" },
    ];

    window.localStorage.getItem
      .mockReturnValueOnce(JSON.stringify(wishlistMock))
      .mockReturnValueOnce(JSON.stringify([]));

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    const removeButton = await screen.findByText(/Remover/i);
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Artículo eliminado de la lista de deseos!");
      expect(window.localStorage.setItem).toHaveBeenCalledWith("wishlist", JSON.stringify([]));
      expect(window.dispatchEvent).toHaveBeenCalled();
    });
  });

  it("agrega un producto al carrito (nuevo producto)", async () => {
    const wishlistMock = [
      { id: 1, Productname: "Manzanas", price: 1200, image: "apple.jpg" },
    ];

    window.localStorage.getItem
      .mockReturnValueOnce(JSON.stringify(wishlistMock)) // wishlist
      .mockReturnValueOnce(JSON.stringify([])); // cart

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    const addButton = await screen.findByText(/Agregar al carrito/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([{ ...wishlistMock[0], quantity: 1 }])
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Manzanas ¡Agregado a tu carrito!",
        expect.any(Object)
      );
    });
  });

  it("incrementa la cantidad si el producto ya está en el carrito", async () => {
    const wishlistMock = [
      { id: 1, Productname: "Manzanas", price: 1200, image: "apple.jpg" },
    ];
    const cartMock = [
      { id: 1, Productname: "Manzanas", price: 1200, image: "apple.jpg", quantity: 1 },
    ];

    window.localStorage.getItem
      .mockReturnValueOnce(JSON.stringify(wishlistMock)) // wishlist
      .mockReturnValueOnce(JSON.stringify(cartMock)); // cart

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    const addButton = await screen.findByText(/Agregar al carrito/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([{ ...cartMock[0], quantity: 2 }])
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Manzanas ¡Agregado a tu carrito!",
        expect.any(Object)
      );
    });
  });

  it("muestra el título principal y la ruta de navegación", () => {
    window.localStorage.getItem
      .mockReturnValueOnce(JSON.stringify([]))
      .mockReturnValueOnce(JSON.stringify([]));

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(screen.getByText("❤️ Tu Lista de Deseos")).toBeInTheDocument();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Lista de deseos")).toBeInTheDocument();
  });
});
