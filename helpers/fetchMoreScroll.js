import { useState, useEffect, useCallback } from 'react'
import throttle from './throttle'

export const useFetchMoreScroll = (output, fetchMoreInit) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const fetchMore = () => {
    fetchMoreInit()
    setIsFetchingMore(true)
  }

  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const onScroll = throttle((e) => {
      if (!isFetchingMore) {
        setScrollPosition(window.scrollY)
      }
    }, 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isFetchingMore])
  useEffect(() => {
    if (!isFetchingMore && scrollPosition) {
      window.scrollTo(0, scrollPosition)
    }
    setIsFetchingMore(false)
  }, [output, isFetchingMore])
  return { fetchMore, isFetchingMore }
}
