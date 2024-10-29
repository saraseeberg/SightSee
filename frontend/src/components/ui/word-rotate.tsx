'use client'

import React, { forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface WordRotateProps extends React.HTMLProps<HTMLDivElement> {
  words: React.ReactNode[]
  duration?: number
  framerProps?: HTMLMotionProps<'h1'>
  speed?: number
  animateOnClick?: boolean
  hidePointerEvents?: boolean
  className?: string
}

const WordRotate = forwardRef<HTMLDivElement, WordRotateProps>(
  (
    {
      words,
      animateOnClick = false,
      hidePointerEvents = false,
      duration = 2500,
      speed = 0.15,
      framerProps = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: speed, ease: 'easeOut' },
      },
      className,

      ...props
    },
    ref,
  ) => {
    const [index, setIndex] = useState(0)

    const animate = () => {
      if (!animateOnClick) return
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }

    useEffect(() => {
      if (!animateOnClick) {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % words.length)
        }, duration)

        // Clean up interval on unmount
        return () => clearInterval(interval)
      }
    }, [words, duration, animateOnClick])

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden py-2', hidePointerEvents && ' pointer-events-none')}
        onClick={animate}
        {...props}
      >
        <AnimatePresence mode="wait">
          <motion.h1 key={index} className={cn(className)} {...framerProps}>
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    )
  },
)

export default WordRotate
