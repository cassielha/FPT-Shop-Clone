import { RouterProvider, createBrowserRouter } from 'react-router'

import Home from './pages/Home'
import Cart from './pages/Cart'

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
    <RouterProvider router={router} />
  )
}

export default App
