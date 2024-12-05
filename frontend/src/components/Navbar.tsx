import Logo from '@/components/atoms/Logo'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarDropDownMenu from './molecules/AvatarDropDownMenu'
import SearchBar from './SearchBar'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import WordRotate from './ui/word-rotate'

const NavbarContent = ({ isDarkMode, toggleIcon }: { isDarkMode: boolean; toggleIcon: () => void }) => {
  const ref = useRef<HTMLDivElement>(null)
  const handleThemeToggle = () => {
    toggleIcon()
    ref.current?.click()
  }
  return (
    <>
      <div className="md:flex-1 flex justify-start gap-10 md:gap-[15%] md:mx-24 max-md:mb-6 max-md:flex-col">
        <Link to="/browse" className="text-xl text-content">
          Browse
        </Link>
      </div>
      <div className="flex gap-5 md:ml-10 max-md:flex-col max-md:justify-between max-md:flex-1">
        <div className="hidden md:flex">
          <SearchBar />
        </div>
        <button
          className="flex items-center text-xl text-content gap-2 "
          onClick={handleThemeToggle}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <p className="md:hidden">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</p>
          <WordRotate
            ref={ref}
            animateOnClick
            hidePointerEvents
            words={[
              <Icon icon="ic:round-wb-sunny" className="h-6 w-6" />,
              <Icon icon="ic:baseline-dark-mode" className="h-6 w-6" />,
            ]}
          />
        </button>
        <AvatarDropDownMenu />
      </div>
    </>
  )
}

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)

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
    <nav
      className={cn(
        'flex gap-2 sticky top-0 h-20 items-center z-50 px-5 lg:px-20 border-b-[1px] border-content/20 backdrop-blur-lg',
      )}
    >
      <Link to="/">
        <Logo />
      </Link>
      <section className="max-md:hidden flex w-full items-center ">
        <NavbarContent isDarkMode={isDarkMode} toggleIcon={toggleIcon} />
      </section>
      <section className="md:hidden flex justify-end w-full text-content">
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <Icon icon="ic:round-menu"  aria-label='hamburger menu' width="24" height="24" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="text-content py-12 flex flex-col ">
            <NavbarContent isDarkMode={isDarkMode} toggleIcon={toggleIcon} />
          </SheetContent>
        </Sheet>
      </section>
    </nav>
  )
}

export default Navbar
