import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import Checkout from "../src/Pages/Checkout";
import { MemoryRouter } from "react-router-dom";
import { within } from "@testing-library/react";

// Mock de localStorage
const mockCart = [
    { id: 1, Productname: "Tomate", price: "$1000", quantity: 2, image: "tomate.jpg" },
    { id: 2, Productname: "Lechuga", price: "$500", quantity: 1, image: "lechuga.jpg" }
];

beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("cart", JSON.stringify(mockCart));
});


describe("Componente Checkout", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        );
    });

    it("muestra los títulos principales de secciones", () => {
        expect(screen.getByText("Contacto")).toBeInTheDocument();
        expect(screen.getByText("Entrega")).toBeInTheDocument();
        expect(screen.getByText("Pago")).toBeInTheDocument();
        expect(screen.getByText("Resumen del pedido")).toBeInTheDocument();
    });

    it("muestra los productos cargados desde localStorage", () => {
        const resumenPedido = screen.getByText("Resumen del pedido").closest("div");

        expect(within(resumenPedido).getByText("Tomate")).toBeInTheDocument();
        expect(within(resumenPedido).getByText("Lechuga")).toBeInTheDocument();
        expect(within(resumenPedido).getByText("Cant. : 2")).toBeInTheDocument();
        expect(within(resumenPedido).getByText("Cant. : 1")).toBeInTheDocument();
    });

    it("calcula correctamente el subtotal, impuesto y total", () => {
        const resumenPedido = screen.getByText("Resumen del pedido").closest("div");
        const subtotal = within(resumenPedido).getByText("$2500");
        const impuesto = within(resumenPedido).getByText("$250");
        const total = within(resumenPedido).getByText("$2750");

        expect(subtotal).toBeInTheDocument();
        expect(impuesto).toBeInTheDocument();
        expect(total).toBeInTheDocument();
    });

    it("permite cambiar la opción de entrega a 'Recoger en tienda'", () => {
        const pickupOption = screen.getByLabelText("Recoger en tienda");
        fireEvent.click(pickupOption);
        expect(pickupOption).toBeChecked();
        expect(screen.getByText("Ubicación de la tienda")).toBeInTheDocument();
    });

    it("muestra inputs del formulario de pago", () => {
        expect(screen.getByPlaceholderText("Número de tarjeta")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Fecha de vencimiento (MM / AA)")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Código de seguridad")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Nombre en la tarjeta")).toBeInTheDocument();
    });

    it("tiene un botón para pagar ahora", () => {
        const payButton = screen.getByText("Pagar ahora");
        expect(payButton).toBeInTheDocument();
    });

    it("muestra el modal de boleta al realizar pedido", async () => {
        const orderButton = screen.getByText(/Realizar pedido/i);
        fireEvent.click(orderButton);

        const modal = await screen.findByText("Boleta de tu pedido"); // encuentra el modal
        const modalContainer = modal.closest(".modal-content"); // contenedor del modal

        // Busca solo dentro del modal
        const modalQueries = within(modalContainer);
        expect(modalQueries.getByText("Producto")).toBeInTheDocument();
        expect(modalQueries.getByText("Cantidad")).toBeInTheDocument();
        expect(modalQueries.getByText("Precio")).toBeInTheDocument();
        expect(modalQueries.getByText("Subtotal")).toBeInTheDocument();
    });

    it("cierra el modal y vacía el carrito al volver al inicio", () => {
        // Simula que el modal está abierto
        const orderButton = screen.getByText(/Realizar pedido/i);
        fireEvent.click(orderButton);

        const backButton = screen.getByText("Volver al inicio");
        fireEvent.click(backButton);

        expect(localStorage.getItem("cart")).toBeNull(); // Carrito vacío
    });

    it("muestra mensaje de carrito vacío si no hay productos", () => {
        localStorage.removeItem("cart");
        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        );

        expect(screen.getByText("¡Tu carrito está vacío!")).toBeInTheDocument();
    });
});
