import { RouterProvider, createBrowserRouter } from 'react-router'

import Home from './pages/Home'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
])

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App