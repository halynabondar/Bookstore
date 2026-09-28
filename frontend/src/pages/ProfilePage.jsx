import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import Container from '../components/Container.jsx'
import { useUser } from '../hooks'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function ProfilePage() {
  const { user, refreshUser } = useUser()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const location = useLocation()
  const orderCreated = location.state?.orderCreated
  const orderId = location.state?.orderId

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '')
      setLastName(user.last_name || '')
    }
  }, [user])

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders`, {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Could not load orders.')
        }

        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) return <Navigate to="/signin" replace />

  const handleSubmit = async event => {
    event.preventDefault()

    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(
          Array.isArray(data.error)
            ? data.error.join(', ')
            : data.error || 'Could not update profile.'
        )
        return
      }

      await refreshUser()
      setSuccessMessage('Your profile has been updated.')
    } catch {
      setError('Could not update profile.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="py-10 lg:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          {orderCreated && (
            <div className="mb-8 rounded-xl bg-green-50 p-6 text-green-800">
              <h2 className="text-lg font-semibold">Order received!</h2>

              <p className="mt-2 text-sm">
                Thank you for your order.
                {orderId && ` Your order number is #${orderId}.`}
              </p>

              <p className="mt-1 text-sm">Your order is being processed.</p>
            </div>
          )}
          <div className="mb-8 flex items-center gap-5 rounded-xl bg-primary/5 p-6">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white">
              {user.first_name?.[0]?.toUpperCase()}
              {user.last_name?.[0]?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-dark">
                {user.first_name} {user.last_name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-primary-dark">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your personal information.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8"
          >
            <h2 className="mb-6 text-xl font-semibold text-primary-dark">
              Personal information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-primary-dark"
                >
                  First name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={event => {
                    setFirstName(event.target.value)
                    setSuccessMessage('')
                  }}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-primary-dark"
                >
                  Last name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={event => {
                    setLastName(event.target.value)
                    setSuccessMessage('')
                  }}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-primary-dark"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
              />

              <p className="mt-2 text-xs text-gray-400">
                Email cannot be changed here.
              </p>
            </div>

            {successMessage && (
              <div className="mt-6 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary-dark">
                ✓ {successMessage}
              </div>
            )}

            {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

            <div className="mt-7">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
          <section className="mt-10">
            <h2 className="mb-6 text-2xl font-semibold text-primary-dark">
              My Orders
            </h2>

            {ordersLoading ? (
              <p className="text-sm text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-gray-500">
                  You haven&apos;t placed any orders yet.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map(order => (
                  <article
                    key={order.id}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-primary-dark">
                          Order #{order.id}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                        {order.status}
                      </span>
                    </div>

                    <div className="my-5 border-t border-gray-200" />

                    <div className="space-y-4">
                      {order.order_items.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={
                              item.book.cover_image || '/books/bookCover.jpg'
                            }
                            alt={item.book.title}
                            className="h-20 w-14 rounded object-cover"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-primary-dark">
                              {item.book.title}
                            </p>

                            <p className="text-sm text-gray-500">
                              {item.book.author}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              Qty: {item.quantity} ×{' '}
                              {Number(item.price).toFixed(2)} kr
                            </p>
                          </div>

                          <p className="font-semibold text-primary-dark">
                            {(Number(item.price) * item.quantity).toFixed(2)} kr
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-between border-t border-gray-200 pt-5">
                      <span className="font-semibold">Total</span>

                      <span className="font-semibold text-primary-dark">
                        {Number(order.total_price).toFixed(2)} kr
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  )
}
