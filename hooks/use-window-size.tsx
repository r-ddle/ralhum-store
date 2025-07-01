import { useState, useEffect } from "react"

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined
    height: number | undefined
  }>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    // Only execute if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      
      // Set initial size
      handleResize()
      
      // Add event listener
      window.addEventListener('resize', handleResize)
      
      // Clean up
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}