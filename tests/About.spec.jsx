import { render, screen, fireEvent } from "@testing-library/react";
import About from "../src/Pages/About"; 
import { describe, it, expect } from "vitest";

describe("About Page", () => {
  it("debe renderizar el encabezado correctamente", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: /Huerto Hogar/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Presentando/i)).toBeInTheDocument();
  });

  it("debe mostrar la descripción principal", () => {
    render(<About />);
    expect(
      screen.getByText(/Nos esforzamos por ofrecer/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Ofrecemos frutas y verduras frescas/i)
    ).toBeInTheDocument();
  });

  it("debe mostrar las imágenes principales con alt correctos", () => {
    render(<About />);
    expect(screen.getByAltText(/decorative lead/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Face/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Products/i)).toBeInTheDocument();
  });

  it("debe actualizar la cita al hacer clic en un logo de cliente", () => {
    render(<About />);


    expect(
      screen.getByText(/Productos orgánicos de alta calidad/i)
    ).toBeInTheDocument();

    const clientLogo = screen.getByAltText(/Grand Golden Gallery/i);
    fireEvent.click(clientLogo);

    expect(
      screen.getByText(/Productos de calidad a excelentes precios/i)
    ).toBeInTheDocument();
  });

  it("debe mostrar los miembros del equipo", () => {
    render(<About />);

    expect(screen.getByText(/Eduardo Silva V/i)).toBeInTheDocument();
    expect(screen.getByText(/Cristian Collao A/i)).toBeInTheDocument();
    expect(screen.getByText(/Fabrizio Gonzalez R/i)).toBeInTheDocument();
  });

  it("debe mostrar las imágenes de los miembros del equipo", () => {
    render(<About />);
    const teamImages = screen.getAllByAltText(/Jennifer C./i);
    expect(teamImages).toHaveLength(3);
  });
});
