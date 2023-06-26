import React from 'react'
import { getWindowWidth } from '@/utils/common'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState(getWindowWidth())

  const handleResize = () => setWindowWidth(getWindowWidth())

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, true)

    return () => window.removeEventListener('resize', handleResize, true)
  }, [])

  return { windowWidth, handleResize }
}

export const useMediaQuery = (maxWidth: number) => {
  const {
    windowWidth: { windowWidth },
    handleResize,
  } = useWindowWidth()
  const [isMedia, setIsMedia] = React.useState(false)

  React.useEffect(() => {
    if (windowWidth <= maxWidth) {
      setIsMedia(true)
    } else {
      setIsMedia(false)
    }
  }, [handleResize, maxWidth, windowWidth])

  return isMedia
}
