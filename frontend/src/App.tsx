import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Register from './pages/Register'
import ReviewPage from './components/ReviewPage'
import Profile from './pages/Profile'
import CenterLayout from './layouts/CenterLayout'

// The app uses a hashrouter, therefore navigating to different routes use /#/Browse or /#/Search
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<CenterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
