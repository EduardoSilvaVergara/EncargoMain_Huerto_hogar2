import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductDetailsOrg from '../src/Pages/ProductDetailsOrg'
import products from '../src/ProductOrganicos.json'

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn()
  }
}))

describe('ProductDetailsOrg Page', () => {
  const product = products[0] 
  const productId = product.id.toString()

  beforeEach(() => {

    const localStorageMock = (() => {
      let store = {}
      return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value.toString() }),
        clear: vi.fn(() => { store = {} }),
        removeItem: vi.fn((key) => { delete store[key] })
      }
    })()
    vi.stubGlobal('localStorage', localStorageMock)

    vi.spyOn(window, 'dispatchEvent').mockImplementation(() => {})
  })

  const renderWithRouter = (id) => {
    render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsOrg />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('debe renderizar el nombre y precio del producto', () => {
    renderWithRouter(productId)
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument()
    expect(screen.getAllByText(product.Productname).length).toBeGreaterThan(0)
  })

  it('debe mostrar las miniaturas y cambiar la imagen principal al hacer clic', () => {
    renderWithRouter(productId)
    const thumbnails = screen.getAllByRole('img', { name: /Thumb/i })
    expect(thumbnails.length).toBeGreaterThan(0)

    const mainImageBefore = screen.getByAltText(/Imagen principal del producto/i).getAttribute('src')
    fireEvent.click(thumbnails[1])
    const mainImageAfter = screen.getByAltText(/Imagen principal del producto/i).getAttribute('src')

    expect(mainImageAfter).not.toBe(mainImageBefore)
  })

  it('debe incrementar y decrementar la cantidad correctamente', () => {
    renderWithRouter(productId)
    const plusButton = screen.getByText('+')
    const minusButton = screen.getByText('-')
    const input = screen.getByDisplayValue('1')

    fireEvent.click(plusButton)
    expect(input.value).toBe('2')

    fireEvent.click(minusButton)
    expect(input.value).toBe('1')

    fireEvent.click(minusButton)
    expect(input.value).toBe('1')
  })

  it('debe agregar el producto al carrito al presionar el botón', () => {
    renderWithRouter(productId)

    const addButton = screen.getByRole('button', { name: /Agregar al carrito/i })
    fireEvent.click(addButton)

    expect(localStorage.setItem).toHaveBeenCalled()
    const cart = JSON.parse(localStorage.setItem.mock.calls[0][1])
    expect(cart[0].Productname).toBe(product.Productname)
  })

  it('debe mostrar datos adicionales como vendedor, colección y código', () => {
    renderWithRouter(productId)
    expect(screen.getByText(product.seller)).toBeInTheDocument()
    expect(screen.getByText(product.collection)).toBeInTheDocument()
    expect(screen.getByText(`Fr-${product.id}`)).toBeInTheDocument()
  })

  it('debe mostrar la descripción del producto', () => {
    renderWithRouter(productId)
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(
      screen.getByText(/Lo mejor de la naturaleza/i)
    ).toBeInTheDocument()
  })
})
