import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import Footer from "../src/Components/Footer";

// Mock de imágenes para Vitest
vi.mock('./../assets/payment-1.svg', () => ({ default: 'payment-1.svg' }));
vi.mock('./../assets/payment-2.svg', () => ({ default: 'payment-2.svg' }));
vi.mock('./../assets/payment-3.svg', () => ({ default: 'payment-3.svg' }));
vi.mock('./../assets/payment-4.svg', () => ({ default: 'payment-4.svg' }));
vi.mock('./../assets/payment-5.svg', () => ({ default: 'payment-5.svg' }));
vi.mock('./../assets/payment-6.svg', () => ({ default: 'payment-6.svg' }));

describe("Componente Footer", () => {
    beforeEach(() => {
        render(<Footer />);
    });

    it("muestra los títulos principales", () => {
        expect(screen.getByText("Compañia")).toBeInTheDocument();
        expect(screen.getByText("Enlaces útiles")).toBeInTheDocument();
        expect(screen.getByText("Información")).toBeInTheDocument();
        expect(screen.getByText("Boletin.")).toBeInTheDocument();
    });

    it("muestra correctamente los enlaces internos", () => {
        const enlacesUtiles = [
            "Producto Nuevos",
            "Más Vendidos",
            "Combos y Ahorra",
            "Tarjeta de Regalo en Línea"
        ];

        enlacesUtiles.forEach(text => {
            expect(screen.getByText(`- ${text}`)).toBeInTheDocument();
        });

        const infoLinks = [
            "Iniciar una Devolución",
            "Contáctanos",
            "Preguntas Frecuentes de Envío",
            "Términos y Condiciones",
            "Política de Privacidad"
        ];

        infoLinks.forEach(text => {
            expect(screen.getByText(`- ${text}`)).toBeInTheDocument();
        });
    });

    it("tiene input de correo y botón de suscripción", () => {
        const input = screen.getByPlaceholderText("Ingresa tu dirección de correo electrónico");
        const button = screen.getByText("Suscribirse");

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("muestra los iconos sociales", () => {
        expect(screen.getByText("© Huerto Hogar 2025 | Creado por Huerto Hogar")).toBeInTheDocument();

        const socialIcons = document.querySelectorAll(".footer-icons i");
        expect(socialIcons.length).toBe(4);
        expect(socialIcons[0].className).toContain("ri-instagram-line");
        expect(socialIcons[1].className).toContain("ri-twitter-x-line");
        expect(socialIcons[2].className).toContain("ri-facebook-circle-fill");
        expect(socialIcons[3].className).toContain("ri-youtube-fill");
    });

    it("muestra el logo de la marca", () => {
        expect(screen.getByText("Huerto Hogar")).toBeInTheDocument();
    });

    it("carga todas las imágenes de métodos de pago", () => {
        const paymentImages = document.querySelectorAll(".payment-img img");
        expect(paymentImages.length).toBe(6);

        // Verificamos que cada imagen tenga un atributo alt o src definido
        paymentImages.forEach(img => {
            expect(img).toHaveAttribute("src");
            expect(img.src).not.toBe(""); // asegúrate de que no esté vacío
        });
    });
});
