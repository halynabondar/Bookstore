import { screen } from '@testing-library/react'

import App from './App'
import { renderWithProviders } from './test-utils/renderWithProviders'

test('renders BookStore logo', () => {
  renderWithProviders(<App />, { route: '/' })

  expect(
    screen.getAllByRole('link', { name: /bookstore/i })[0]
  ).toBeInTheDocument()
})
