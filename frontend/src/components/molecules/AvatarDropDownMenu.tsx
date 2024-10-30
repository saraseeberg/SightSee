import { Icon } from '@iconify/react/dist/iconify.js'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { profileMenuLinks } from '@/lib/data/profileMenuLinks'
import { useState } from 'react'
import { Button } from '../ui/button'

const AvatarDropDownMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    name: 'Lotte',
    username: 'LotteTotten27',
    image: 'https://github.com/shadcn.png',
  }
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <Button onClick={handleLogin}>Logg inn</Button>
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="flex gap-2 max-md:hover:bg-content/10 p-1 rounded-md">
          <Avatar className="max-md:w-14 h-auto">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="md:hidden flex flex-col items-start">
            <p className="text-lg font-bold">Lotte</p>
            <p className="text-grey">LotteTotten27</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" sticky="always">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuLinks.map((link) => (
          <DropdownMenuItem key={link.title}>
            <Link
              to={link.href}
              className="flex gap-2 items-center hover:bg-accent-1 w-full py-2 px-1 rounded-md hover:text-white"
            >
              <Icon icon={link.icon} />
              {link.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex gap-2 items-center hover:bg-accent-1 w-full px-3 py-2 rounded-md group hover:text-white">
            <Icon icon="mdi:logout" className="group-hover:translate-x-1 duration-200 transition-all" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default AvatarDropDownMenu
