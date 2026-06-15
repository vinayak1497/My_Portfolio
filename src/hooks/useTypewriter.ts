'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const reset = useCallback(() => {
    setDisplayedText('')
    setIsComplete(false)
    setIsStarted(false)
  }, [])

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    setDisplayedText('')
    setIsComplete(false)

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setIsComplete(true)
        onCompleteRef.current?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, isStarted])

  return { displayedText, isComplete, isStarted, reset }
}
