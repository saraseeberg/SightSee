import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Register from './pages/Register'
import ReviewPage from './pages/ReviewPage'

// The app uses a hashrouter, therefore navigating to different routes use /#/Browse or /#/Search
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/Review' element={<ReviewPage />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </HashRouter>
  )
}

export default App
