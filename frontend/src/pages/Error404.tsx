import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

const Error404 = () => {
  const [hasEatenBurger, setHasEatenBurger] = useState(false)

  const handleBurgerClick = () => {
    setHasEatenBurger(true)
    localStorage.setItem('eatenBurger', (parseInt(localStorage.getItem('eatenBurger') || '0') + 1).toString())
  }
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-4 bg-background text-content">
      <h1 className="text-3xl font-bold text-center">Oh no, looks like you've traveled a bit to far</h1>
      <div>
        <p>Here is a burger for your troubles:</p>
        {!hasEatenBurger ? (
          <Icon
            icon={'fxemoji:hamburger'}
            className={`mx-auto size-8 cursor-help animate-float ${hasEatenBurger && 'hidden'}`}
            onClick={handleBurgerClick}
          />
        ) : (
          <p className="text-center">Oh... taste good?</p>
        )}
      </div>
      <span>Now get back in there!</span>
      <Button onClick={() => window.history.back()} className="group">
        <span className="inline-flex items-center">
          <Icon icon={'tabler:arrow-back-up'} className="group-hover:-translate-x-1 duration-500" />
          Go Back
        </span>
      </Button>
    </main>
  )
}

export default Error404
