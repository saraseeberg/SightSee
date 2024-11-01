import { Icon } from '@iconify/react/dist/iconify.js'

const Logo = () => {
  return (
    <h1 className="flex flex-row items-center text-3xl max-md:text-2xl">
      {' '}
      <span>
        <Icon icon="ion:earth" className="self-center mr-1" />{' '}
      </span>{' '}
      SightSee
    </h1>
  )
}

export default Logo
