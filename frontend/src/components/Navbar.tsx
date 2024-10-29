import Logo from '@/components/atoms/Logo'
import LocationsData from '@/lib/data/locationsData.ts'
import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.tsx'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const searchData = LocationsData.map(({ id, ...rest }) => rest)

  const toggleIcon = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    }
  }, [])
  return (
    <>
      <nav className="flex gap-2 sticky top-0  w-full h-20 items-center bg-background  z-50">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex flex-1 justify-around items-center max-md:hidden">
          <div className="flex items-center justify-around gap-2">
            <Link to="/Browse" className="self-center mx-8 transition-colors text-xl font-bold">
              Browse
            </Link>
          </div>
          <div className="flex flex-row ml-auto items-center">
            <SearchBar data={searchData} />
            <Icon
              icon={isDarkMode ? 'ic:round-wb-sunny' : 'ic:baseline-dark-mode'}
              className="flex justify-end md:mr-16 mx-2 h-6 w-6 text-content cursor-pointer ml-auto"
              onClick={toggleIcon}
            />
          </div>
        </div>
        <div className="ml-auto md:hidden flex justify-end mr-16 text-content">
          <Sheet>
            <SearchBar data={searchData} />
            <SheetTrigger asChild>
              <button>
                <Icon icon="ic:round-menu" width="24" height="24" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="text-content">
              <nav className="flex flex-col items-start gap-4 p-4 mb-3">
                <Link to="/" className="transition-colors text-xl text-content  ">
                  Home
                </Link>
                <Link to="/Browse" className="transition-colors text-xl text-content  ">
                  Browse
                </Link>
                <button className="flex items-center text-xl text-content" onClick={toggleIcon}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  <Icon icon={isDarkMode ? 'ic:round-wb-sunny' : 'ic:baseline-dark-mode'} className="h-6 w-6  ml-2  " />
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  )
}

export default Navbar
