import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'

const SoMeIcon = ({ icon, href }: { icon: string; href: string }) => (
  <Link to={href} className="hover:scale-105  hover:text-secondary/80 ">
    <Icon icon={icon} className="h-6 w-6" />
  </Link>
)

const Footer = () => {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = 'https://i.imgflip.com/70peq9.gif'
  }

  return (
    <footer className="w-full bg-accent-1 flex min-h-56 px-16 py-24 gap-6 text-white mt-4 ">
      <section className="flex-1 space-y-5">
        <p className="text-accent-2">IT'S FREE</p>
        <h1 className="text-2xl font-bold">Don't miss out on our newsletter</h1>
        <form onSubmit={handleSubscribe} className="flex items-center gap-2">
          <Input type="email" required placeholder="Your Email" />
          <Button variant="secondary" size="lg">
            Subscribe
          </Button>
        </form>
      </section>
      <section className="flex-1 flex ">
        <div className="flex-1 flex justify-around">
          <div className="text-accent-2 flex flex-col gap-6">
            <Link to="/Browse">Browse</Link>
            <Link to="/Reviews">Reviews</Link>
          </div>
          <div className="text-accent-2 flex flex-col gap-6 group">
            <p className="group-hover:-translate-x-48 group-hover:pointer-events-none">Terms and conditions</p>
            <p className={'group-hover:-translate-y-24 group-hover:pointer-events-none'}>Privacy Policy</p>
            <p className={'group-hover:translate-y-24 group-hover:pointer-events-none'}>Cookie Policy</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:instagram-fill" />
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:twitter-fill" />
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:linkedin-fill" />
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:facebook-fill" />
        </div>
      </section>
    </footer>
  )
}

export default Footer
