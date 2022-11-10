import { useEffect, useState } from 'react'

export const useSpoiler = (ref) => {
  const [height, setHeight] = useState()
  const [showMore, setShowMore] = useState(false)
  useEffect(() => {
    const handleResize = () => showMore && setHeight(ref.current.offsetHeight)
    if (showMore) {
      setHeight(ref.current.offsetHeight)
    } else {
      setHeight(0)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [showMore])

  useEffect(() => {}, [])

  return {
    height,
    isOpened: showMore,
    toggleMore: () => setShowMore(!showMore),
    closeMore: () => setShowMore(false),
    openMore: () => setShowMore(true),
  }
}
