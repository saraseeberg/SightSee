export const profileMenuLinks = [
  {
    title: 'Profile',
    icon: 'mdi:account',
    href: '/profile',
  },
  {
    title: 'Settings',
    icon: 'ic:round-settings',
    href: '/settings',
  },
]

export type ProfileMenuLink = (typeof profileMenuLinks)[number]
