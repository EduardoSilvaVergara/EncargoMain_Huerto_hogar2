import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Blog from '../src/Pages/Blog'


import blogs from '../src/Blogs.json'

describe('Blog Page', () => {
  it('debe renderizar el título principal', () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    )
    expect(screen.getByText(/📰 Noticias 📰/)).toBeInTheDocument()
  })

  it('debe renderizar todas las tarjetas de blogs', () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    )
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(blogs.length)
  })

  it('cada tarjeta debe mostrar título, autor y fecha', () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    )
    blogs.forEach(blog => {
      expect(screen.getByText(blog.title)).toBeInTheDocument()
      expect(screen.getByText(blog.author)).toBeInTheDocument()
      expect(screen.getAllByText(blog.date).length).toBeGreaterThan(0)
    })
  })

  it('cada blog debe tener un enlace con la URL correcta', () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    )
    blogs.forEach(blog => {
      const link = screen.getByRole('link', { name: blog.pere })
      expect(link).toHaveAttribute('href', blog.link)
    })
  })
})
