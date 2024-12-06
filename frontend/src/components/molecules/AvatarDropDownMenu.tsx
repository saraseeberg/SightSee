import { useAuth } from '@/lib/context/auth-context'
import { profileMenuLinks } from '@/lib/links/profileMenuLinks'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const AvatarDropDownMenu = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return <Button href="/login">Logg inn</Button>
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger aria-label="Open profile menu">
        <div className="flex gap-2 max-md:hover:bg-content/10 p-1 rounded-md">
          <Avatar className="max-md:size-16 border-[1px] border-content/50 ">
            <AvatarImage src={user.image as string} alt="profile picture" />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="md:hidden flex flex-col items-start justify-center">
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-muted-foreground">{user.username}</p>
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
              aria-label={`Go to ${link.title}`}
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
            aria-label="Log out of your account"
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
