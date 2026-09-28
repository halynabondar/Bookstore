import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import Container from '../components/Container.jsx'
import { useCart, useUser } from '../hooks'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { cartItems, cartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  if (!cartItems.length && !orderPlaced) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = event => {
    const { name, value } = event.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async event => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipping: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            country: formData.country,
          },
          items: cartItems.map(item => ({
            book_id: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.error)
            ? data.error.join(', ')
            : data.error || 'Failed to place order'
        )
      }

      setOrderPlaced(true)

      navigate('/profile', {
        state: {
          orderCreated: true,
          orderId: data.id,
        },
      })

      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="py-10 lg:py-16">
      <Container>
        <h1 className="mb-8 text-3xl font-semibold text-primary-dark">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[1fr_360px]"
        >
          <section>
            <h2 className="mb-6 text-xl font-semibold text-primary-dark">
              Shipping information
            </h2>

            {error && (
              <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary sm:col-span-2"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary sm:col-span-2"
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary sm:col-span-2"
              />
            </div>
          </section>

          <aside className="h-fit rounded-xl border border-gray-200 p-6">
            <h2 className="mb-6 text-xl font-semibold text-primary-dark">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-primary-dark">
                      {item.title}
                    </p>

                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <p className="shrink-0 font-medium">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${Number(cartTotal).toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Placing order...' : 'Place order'}
            </button>
          </aside>
        </form>
      </Container>
    </main>
  )
}
