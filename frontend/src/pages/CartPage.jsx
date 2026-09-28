import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Navigate, Link, useNavigate } from 'react-router-dom'

import Container from '../components/Container.jsx'
import { useCart, useUser } from '../hooks/index.js'

export default function CartPage() {
  const { user } = useUser()
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/signin" replace />

  if (!cartItems.length) {
    return (
      <main className="py-16">
        <Container>
          <div className="mx-auto max-w-xl py-16 text-center">
            <h1 className="mb-3 text-3xl font-semibold text-primary-dark">
              Your cart is empty
            </h1>

            <p className="mb-8 text-gray-500">
              Looks like you haven&apos;t added any books yet.
            </p>

            <Link
              to="/shop"
              className="inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Continue shopping
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="py-10 lg:py-16">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-primary-dark">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {cartItems.map(item => (
                <article
                  key={item.id}
                  className="grid gap-5 py-6 sm:grid-cols-[110px_1fr_auto]"
                >
                  <Link to={`/books/${item.id}`}>
                    <img
                      src={item.cover_image || '/books/bookCover.jpg'}
                      alt={item.title}
                      className="aspect-[3/4] w-full rounded-lg object-cover"
                    />
                  </Link>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase text-primary">
                      {item.genre}
                    </p>

                    <Link
                      to={`/books/${item.id}`}
                      className="text-lg font-semibold text-primary-dark transition hover:opacity-70"
                    >
                      {item.title}
                    </Link>

                    <p className="mt-1 text-sm text-gray-500">{item.author}</p>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex size-9 items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-50"
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex size-9 items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-50"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 flex items-center gap-1 text-sm text-gray-400 transition hover:text-red-500"
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 19 }} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-primary-dark">
                      {(Number(item.price) * item.quantity).toFixed(2)} kr
                    </p>

                    {item.quantity > 1 && (
                      <p className="mt-1 text-xs text-gray-400">
                        {item.price} kr each
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 flex justify-between">
              <Link
                to="/shop"
                className="font-semibold text-primary transition hover:opacity-70"
              >
                ← Continue shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-gray-400 transition hover:text-red-500"
              >
                Clear cart
              </button>
            </div>
          </section>

          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:p-7">
            <h2 className="mb-6 text-xl font-semibold text-primary-dark">
              Order Summary
            </h2>

            <div className="space-y-4 border-b border-gray-200 pb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>

                <span className="font-medium">{cartTotal.toFixed(2)} kr</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-primary">Free</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="font-semibold text-primary-dark">Total</span>

              <span className="text-2xl font-semibold text-primary-dark">
                {cartTotal.toFixed(2)} kr
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Checkout
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Taxes and shipping calculated at checkout.
            </p>
          </aside>
        </div>
      </Container>
    </main>
  )
}
