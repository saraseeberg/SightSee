import { Button } from './ui/button'
import { Input } from './ui/input'
import { FormEvent } from 'react'

const Footer = () => {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = 'https://i.imgflip.com/70peq9.gif'
  }

  return (
    <footer className="w-full bg-accent-1 flex min-h-56 px-16 py-24 ">
      <section className="flex-1 space-y-5">
        <p className="text-accent-2">IT'S FREE</p>
        <h1 className="text-white text-2xl font-bold">Don't miss out on our newsletter</h1>
        <form onSubmit={handleSubscribe} className="flex items-center gap-2">
          <Input type="email" required placeholder="Your Email" />
          <Button variant="secondary" size="lg">
            Subscribe
          </Button>
        </form>
      </section>
      <div className="flex-1 "></div>
    </footer>
  )
}

export default Footer
