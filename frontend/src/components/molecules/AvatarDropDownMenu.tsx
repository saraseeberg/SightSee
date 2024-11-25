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
import { Link, useNavigate } from 'react-router-dom'
import { profileMenuLinks } from '@/lib/data/profileMenuLinks'
import { Button } from '../ui/button'
import { useAuth } from '@/lib/context/auth-context'

const AvatarDropDownMenu = () => {
  const { isLoggedIn, logout, user } = useAuth()
  const navigate = useNavigate()

  if (!isLoggedIn || !user) {
    return <Button href="/login">Logg inn</Button>
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="flex gap-2 max-md:hover:bg-content/10 p-1 rounded-md">
          <Avatar className="max-md:size-16 ">
            <AvatarImage src={user.image as string} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="md:hidden flex flex-col items-start justify-center">
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-grey">{user.username}</p>
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
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="flex gap-2 items-center hover:bg-accent-1 w-full px-3 py-2 rounded-md group hover:text-white"
          >
            <Icon icon="mdi:logout" className="group-hover:translate-x-1 duration-200 transition-all" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default AvatarDropDownMenu
