import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CenterLayout from './layouts/CenterLayout'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import DestinationDetailsPage from './pages/DestinationDetail'
import { AuthProvider } from './lib/context/auth-context'
import { Settings } from './pages/Settings'

// The app uses a hashrouter, therefore navigating to different routes use /#/Browse or /#/Search

const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'browse', element: <Browse /> },
        { path: 'destination/:id', element: <DestinationDetailsPage /> },
        { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    {
      path: '/*',
      element: <CenterLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Error404 /> },
      ],
    },
  ],
  {
    basename: '/project2',
  },
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/destination/:id" element={<DestinationDetailsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<CenterLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes> */}
    </AuthProvider>
  )
}

export default App
