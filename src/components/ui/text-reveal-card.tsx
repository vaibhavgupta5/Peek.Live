import { useState } from "react"

interface TextRevealCardProps {
  text: string
  revealText: string
  className?: string
}

export const TextRevealCard = ({ text, revealText, className }: TextRevealCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleReveal = () => {
    setIsRevealed(true)
  }

  return (
    <div className={`relative ${className}`} onClick={handleReveal}>
      <span className="absolute inset-0 flex items-center justify-center text-gray-500 transition-opacity duration-300">
        {isRevealed ? revealText : text}
      </span>
      <span className="absolute inset-0 flex items-center justify-center text-gray-500 transition-opacity duration-300 opacity-0">
        {isRevealed ? text : revealText}
      </span>
    </div>
  )
}

