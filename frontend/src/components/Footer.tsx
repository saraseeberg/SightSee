import { Icon } from '@iconify/react/dist/iconify.js'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'

const SoMeIcon = ({ icon, href, label }: { icon: string; href: string; label: string }) => (
  <Link to={href} aria-label={label}>
    <Icon icon={icon} className="h-6 w-6 hover:scale-105 hover:text-secondary/80" />
  </Link>
)

const Footer = () => {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = 'https://i.imgflip.com/70peq9.gif'
  }

  return (
    <footer className="w-full bg-accent-1 flex max-md:flex-col px-16 py-10 gap-10 text-white mt-4">
      <section className="flex-1 space-y-5">
        <h1 className="text-2xl font-bold">Don't miss out on our newsletter</h1>
        <form onSubmit={handleSubscribe} className="flex max-md:flex-col items-center gap-2">
          <Input type="email" required placeholder="Your Email" />
          <Button variant="secondary" size="lg">
            Subscribe
          </Button>
        </form>
        <div className="flex flex-row items-center max-md:justify-center">
          <Icon icon="ic:baseline-copyright" aria-label="copyright" />
          <p className=" mx-1 text-xs"> {new Date().getFullYear()} Group 33, all rights reserved </p>
        </div>
      </section>
      <section className="flex-1 flex max-md:flex-col">
        <div className="flex-1 flex justify-around items-start">
          <div className="flex flex-col py-10 gap-6">
            <Link to="/browse">Browse</Link>
            <Link to="/reviews">Reviews</Link>
          </div>
        </div>
        <div className="flex md:flex-col justify-around my-3 gap-6">
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:instagram-fill" label="Instagram" />
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:twitter-fill" label="Twitter" />
          <SoMeIcon href="https://i.imgflip.com/70peq9.gif" icon="akar-icons:linkedin-fill" label="LinkedIn" />
        </div>
      </section>
    </footer>
  )
}

export default Footer
