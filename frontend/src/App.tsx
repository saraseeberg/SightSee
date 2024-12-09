import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CenterLayout from './layouts/CenterLayout'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './lib/context/auth-context'
import { setUpPersistance } from './main'
import Browse from './pages/Browse'
import DestinationDetailsPage from './pages/DestinationDetail'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Login'
import Planner from './pages/Planner'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { Settings } from './pages/Settings'

function App() {
  useEffect(() => {
    setUpPersistance()
  }, [])
  return (
    <BrowserRouter>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/destination/:id" element={<DestinationDetailsPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/planner" element={<Planner />} />
            </Route>
            <Route element={<CenterLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </DndProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
