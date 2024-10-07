import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import MainLayout from './layouts/MainLayout'

// The app uses a hashrouter, therefore navigating to different routes use /#/Browse or /#/Search
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
