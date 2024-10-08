import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import React from "react"

function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const toggleIcon = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      <nav className="flex gap-2 m-2 sticky top-0 w-full h-20 bg-white items-center z-50">
        <div className="cursor-pointer">
          <Link to={"/"}>
            <h1 className="flex flex-row items-center ml-12 text-3xl max-md:text-2xl">
              <Icon icon="ion:earth" className="self-center mr-1" />
              SeightSee
            </h1>
          </Link>
        </div>
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
            icon={isDarkMode ? "ic:baseline-dark-mode" : "ic:round-wb-sunny"}
            className="flex justify-end md:mr-16 mx-2 h-6 w-6 text-black cursor-pointer ml-auto  hover:text-lightmodeGreen"
            onClick={toggleIcon}
          />
        </div>
        <div className="ml-auto md:hidden flex justify-end mr-16">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Icon icon="ic:round-menu" width="24" height="24" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col items-start gap-4 p-4 mb-3">
                <Link to="/Browse" className="text-xl  hover:text-lightmodeGreen">
                  Browse
                </Link>
                <Link to="/Reviews" className="text-xl  hover:text-lightmodeGreen">
                  Reviews
                </Link>
                <button
                  className="flex items-center hover:text-lightmodeGreen text-xl"
                  onClick={toggleIcon}
                >
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                  <Icon
                    icon={isDarkMode ? "ic:baseline-dark-mode" : "ic:round-wb-sunny"}
                    className="h-6 w-6  ml-2 "
                  />
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
