import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductDetailsLacteos from '../src/Pages/ProductDetailsLacteos'
import products from '../src/ProductLacteos.json'

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn()
  }
}))

describe('ProductDetailsLacteos Page', () => {
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
          <Route path="/product/:id" element={<ProductDetailsLacteos />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('debe mostrar el nombre, precio e imágenes del producto', () => {
    renderWithRouter(productId)
    expect(screen.getAllByText(product.Productname).length).toBeGreaterThan(0)
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument()
    const thumbnails = screen.getAllByRole('img', { name: /Thumb/i })
    expect(thumbnails.length).toBeGreaterThan(0)
  })

  it('debe cambiar la imagen principal al hacer clic en una miniatura', () => {
    renderWithRouter(productId)
    const thumbnails = screen.getAllByRole('img', { name: /Thumb/i })
    expect(thumbnails.length).toBeGreaterThan(0)

    const mainImageBefore = screen.getByAltText(/Imagen principal del producto/i).getAttribute('src')
    fireEvent.click(thumbnails[1])
    const mainImageAfter = screen.getByAltText(/Imagen principal del producto/i).getAttribute('src')

    expect(mainImageAfter).not.toBe(mainImageBefore)
  })

  it('debe aumentar y disminuir la cantidad correctamente', () => {
    renderWithRouter(1)
    const input = screen.getByDisplayValue('1')
    const increaseBtn = screen.getByText('+')
    const decreaseBtn = screen.getByText('-')

    fireEvent.click(increaseBtn)
    expect(input.value).toBe('2')

    fireEvent.click(decreaseBtn)
    expect(input.value).toBe('1')
  })

  it('debe agregar el producto al carrito al hacer clic en "Agregar al carrito"', () => {
    renderWithRouter(1)
    const button = screen.getByText(/Agregar al carrito/i)
    fireEvent.click(button)

    const cart = JSON.parse(localStorage.getItem('cart'))
    expect(cart).not.toBeNull()
    expect(cart.length).toBeGreaterThan(0)
    expect(cart[0].Productname).toBe('Leche Entera')
  })
})
