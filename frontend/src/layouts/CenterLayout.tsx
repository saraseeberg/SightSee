import { Outlet } from 'react-router-dom'

const CenterLayout = () => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-4 bg-background text-content">
      <Outlet />
    </main>
  )
}

export default CenterLayout
