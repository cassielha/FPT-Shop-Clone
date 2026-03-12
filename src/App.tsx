import { RouterProvider, createBrowserRouter } from 'react-router'

import Home from './pages/Home'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import RootLayout from './layout/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  }
])

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App