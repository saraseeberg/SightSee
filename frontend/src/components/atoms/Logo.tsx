import { Icon } from '@iconify/react/dist/iconify.js'

const Logo = () => {
  return (
    <h1 className=" text-xl flex flex-row items-center ml-12 md:text-3xl">
      {' '}
      <span>
        <Icon icon="ion:earth" className="self-center mr-1" />{' '}
      </span>{' '}
      SightSee
    </h1>
  )
}

export default Logo
