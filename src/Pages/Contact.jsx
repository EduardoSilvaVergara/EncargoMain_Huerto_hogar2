import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createMensaje } from '../api'

function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [sending, setSending] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) {
      toast.error('Completa nombre, email y mensaje.')
      return
    }
    try {
      setSending(true)
      await createMensaje({
        nombre: form.nombre,
        email: form.email,
        mensaje: form.mensaje
      })
      toast.success('Mensaje enviado. ¡Gracias por contactarnos!')
      setForm({ nombre: '', email: '', mensaje: '' })
    } catch (err) {
      console.error(err)
      toast.error('No se pudo enviar el mensaje. Intenta nuevamente.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="contact-section mt-5">
        <div className="container">
          <h2 className="section-title">Mantente en contacto con nosotros</h2>
          <p className="section-subtitle">
            Sé el primero en enterarte de nuevos lanzamientos, ofertas exclusivas y consejos de expertos para una piel radiante.
          </p>

          <div className="row contact-boxes">
            <div className="contact-col">
              <div className="contact-box bg-transparent border-0">
                <i className="ri-map-pin-line icon"></i>
                <h5>Dirección</h5>
                <p>Huerto Hogar, 3er piso, Edificio Los Aromos, Av. Providencia 1234, Santiago, Chile</p>
                <p className="mb-4">Las Condes, Santiago, Región Metropolitana - 7550000</p>
                <a href="#" target='_blank' rel="noopener noreferrer" className='link'>Cómo llegar</a>
              </div>
            </div>

            <div className="contact-col">
              <div className="contact-box bg-transparent border-0">
                <i className="ri-phone-line icon"></i>
                <h5>Contacto</h5>
                <p><strong>Teléfono móvil:</strong>+56 9 1234 5678</p>
                <p><strong>Atención al cliente:</strong>+56 2 2345 6789</p>
                <p><strong>Correo electrónico:</strong>contacto@huertohogar.cl</p>
              </div>
            </div>

            <div className="contact-col">
              <div className="contact-box bg-transparent border-0">
                <i className="ri-time-line icon"></i>
                <h5>Horario de atención</h5>
                <p><strong>Lun - Vie: </strong> 08:30 - 20:00 </p>
                <p><strong>Sáb - Dom: </strong> 09:30 - 21:30 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-page">
        <section className="map-section container">
          <iframe
            title="Our Location"
            className='map rounded'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.864916262953!2d-71.53575902360512!3d-33.033689173557484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de64d74fd4af%3A0x8004f381e9055a38!2sDuoc%20UC%20Vi%C3%B1a%20Del%20Mar!5e0!3m2!1ses-419!2scl!4v1759610932251!5m2!1ses-419!2scl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        <section className="message-section">
          <h2 className="form-title">Enviar un mensaje</h2>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="row">
              <input
                type="text"
                name="nombre"
                placeholder='Nombre'
                className="input"
                value={form.nombre}
                onChange={onChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder='Correo electrónico'
                className="input"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="row">
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                className="textarea"
                value={form.mensaje}
                onChange={onChange}
                required
              />
            </div>
            <button type='submit' className='btn px-5' disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </section>
      </div>

      <ToastContainer />
    </>
  )
}

export default Contact