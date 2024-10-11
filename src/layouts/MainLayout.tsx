import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <main className="bg-background min-h-screen text-content transition-all flex flex-col">
      <Navbar />
      <div className="flex-1 2xl:mx-[10%]">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default MainLayout
