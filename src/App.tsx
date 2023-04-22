import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Pools from './pages/Pools'
import Staked from './pages/Staked'
import Boost from './pages/Boost'
import Home from './pages/Home'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='pools' element={<Pools />} />
      <Route path="staked" element={<Staked />} />
      <Route path="boost" element={<Boost />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App