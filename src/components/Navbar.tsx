import Logo from '@/assets/Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

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
      <nav className="flex gap-2 sticky top-0  w-full h-20 items-center z-50">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex flex-1 justify-around items-center max-md:hidden">
          <div className="flex items-center justify-around gap-2">
            <Link
              to="/Browse"
              className="self-center mx-8 transition-colors text-xl hover:text-lightmodeGreen font-bold"
            >
              Browse
            </Link>
            <Link
              to="/Reviews"
              className="self-center mx-4 transition-colors text-xl hover:text-lightmodeGreen font-bold"
            >
              Reviews
            </Link>
          </div>
          <Icon
            icon={isDarkMode ? 'ic:baseline-dark-mode' : 'ic:round-wb-sunny'}
            className="flex justify-end md:mr-16 mx-2 h-6 w-6 text-content cursor-pointer ml-auto"
            onClick={toggleIcon}
          />
        </div>
        <div className="ml-auto md:hidden flex justify-end mr-16">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Icon icon="ic:round-menu" width="24" height="24" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {' '}
                <Link to="/Browse">Browse</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {' '}
                <Link to="/Reviews">Reviews</Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span className="flex-row flex">
                        <Icon icon={'ic:baseline-dark-mode'} className="m-0.5" />
                        Dark
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="flex-row flex">
                        <Icon icon={'ic:round-wb-sunny'} className="m-0.5" /> Light
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  )
}

export default Navbar
