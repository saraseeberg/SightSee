import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <main className="bg-background text-content transition-all">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default MainLayout
