import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(searchQuery)
  }

  const setTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      sessionStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      sessionStorage.setItem('theme', 'dark')
    }
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const theme = sessionStorage.getItem('theme')
    console.log(theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    }
  }, [])

  return (
    <header className="sticky top-0 flex h-20 items-center px-4 md:px-6">
      <nav className="flex items-center justify-between flex-grow">
        <Icon icon="ion:earth" width="27" height="27" className="ml-12" />
        <h1 className="text-2xl ml-0.3">SeightSee</h1>
        <Link to="/Browse" className="transition-colors hover:text-lightmodeGreen ml-28 font-bold">
          Browse
        </Link>
        <Link to="/Reviews" className="transition-colors hover:text-lightmodeGreen ml-12 font-bold">
          Reviews
        </Link>
        <div className="flex items-center ml-auto">
          <div className="flex items-start mr-2">
            <Icon
              icon={isDarkMode ? 'ic:round-wb-sunny' : 'ic:baseline-dark-mode'}
              className="h-6 w-6 text-content cursor-pointer"
              onClick={setTheme}
            />
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex items-center ml-0.5">
          <div className="relative">
            <Icon icon="ic:baseline-search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border bg-background px-8 py-2 text-sm focus-visible:outline-none"
            />
          </div>
        </form>
      </nav>
    </header>
  )
}

export default Navbar
