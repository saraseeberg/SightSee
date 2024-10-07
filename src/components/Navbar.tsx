import { Icon } from "@iconify/react"
import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(searchQuery)
  }

  const toggleIcon = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="sticky top-0  w-full flex h-20 items-center px-4 md-max:px-1  md:px-4">
      <nav className="flex items-center justify-between flex-grow ">
        <Icon icon="ion:earth" className="ml-10 w-7 h-7 " />
        <h1 className="text-xl ml-0.1 md:text-2xl ml-0.3">SeightSee</h1>
        <Link to="/Browse" className="transition-colors hover:text-lightmodeGreen ml-28 font-bold md:ml">
          Browse
        </Link>
        <Link to="/Reviews" className="transition-colors hover:text-lightmodeGreen ml-12 font-bold">
          Reviews
        </Link>
        <div className="flex items-center ml-auto">
          <div className="flex items-start mr-2">
            <Icon
              icon={isDarkMode ? "ic:baseline-dark-mode" : "ic:round-wb-sunny"}
              className="h-6 w-6 text-black cursor-pointer"
              onClick={toggleIcon}
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
              className="flex h-10 w-full rounded-md border bg-background px-6 py-2 text-sm focus-visible:outline-none md:px-8  "
            />
          </div>
        </form>
      </nav>
    </header>
  )
}

export default Navbar
