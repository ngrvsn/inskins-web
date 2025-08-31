'use client'
import { useState, useEffect } from 'react'
import styles from './Timer.module.scss'

interface ITimerProps {
  initialTime: number // в секундах
  onTimeout: () => void
  className?: string
}

export const Timer = ({ initialTime, onTimeout, className }: ITimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeout])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className={`${styles.timer} ${className || ''}`}>
      {formatTime(timeLeft)}
    </div>
  )
}
