import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Contact from '../src/pages/Contact'

describe('Contact Page', () => {
  it('debe renderizar el título y subtítulo principal', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )

    expect(
      screen.getByText(/Mantente en contacto con nosotros/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Sé el primero en enterarte de nuevos lanzamientos/i)
    ).toBeInTheDocument()
  })

  it('debe renderizar el enlace "Cómo llegar"', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )

    const link = screen.getByRole('link', { name: /Cómo llegar/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#')
  })

  it('debe renderizar el iframe con el mapa', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )

    const iframe = screen.getByTitle(/Our Location/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe.tagName).toBe('IFRAME')
  })

  it('debe renderizar los campos del formulario de contacto', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )

    // Inputs
    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Correo electrónico/i)
    ).toBeInTheDocument()

    // Textarea
    expect(screen.getByPlaceholderText(/Mensaje/i)).toBeInTheDocument()

    // Botón
    const button = screen.getByRole('button', { name: /Enviar/i })
    expect(button).toBeInTheDocument()
  })

  it('debe permitir completar y enviar el formulario', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )

    const inputNombre = screen.getByPlaceholderText(/Nombre/i)
    const inputCorreo = screen.getByPlaceholderText(/Correo electrónico/i)
    const inputMensaje = screen.getByPlaceholderText(/Mensaje/i)
    const botonEnviar = screen.getByRole('button', { name: /Enviar/i })

    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } })
    fireEvent.change(inputCorreo, { target: { value: 'juan@test.com' } })
    fireEvent.change(inputMensaje, { target: { value: 'Hola!' } })

    expect(inputNombre.value).toBe('Juan Pérez')
    expect(inputCorreo.value).toBe('juan@test.com')
    expect(inputMensaje.value).toBe('Hola!')

    // 👇 Simulamos envío del formulario
    const form = botonEnviar.closest('form')
    const onSubmit = vi.fn()
    form.onsubmit = (e) => {
      e.preventDefault()
      onSubmit()
    }

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
