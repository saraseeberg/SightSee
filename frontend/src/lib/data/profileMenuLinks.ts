export const profileMenuLinks = [
  {
    title: 'Profile',
    icon: 'mdi:account',
    href: '/profile',
  },
  {
    title: 'Saved Destinations',
    icon: 'ic:baseline-airplane-ticket',
    href: '/profile/saved',
  },
]

export type ProfileMenuLink = (typeof profileMenuLinks)[number]
