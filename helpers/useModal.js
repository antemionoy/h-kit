import { useRef, useState, useEffect } from 'react'

export const useModal = () => {
  const modalRef = useRef(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const [scrollPosition, setScrollPosition] = useState(0)
  const closeModal = () => {
    setModalOpen(false)
    document.body.classList.remove('scroll-lock')
    document.body.style.top = '0'
    window.scrollTo(0, scrollPosition)
  }
  useEffect(() => {
    const onOutsideClose = (e) => {
      if (
        modalRef &&
        modalRef.current &&
        !modalRef.current.contains(e.target) && isModalOpen
      ) {
        closeModal()
      }
    }
    const onEscClose = (e) => {
      if (e.keyCode === 27) {
        closeModal()
      }
    }
    document.addEventListener('click', onOutsideClose)
    document.addEventListener('keydown', onEscClose)
    return () => {
      document.removeEventListener('click', onOutsideClose)
      document.removeEventListener('keydown', onEscClose)
    }
  }, [isModalOpen])

  const openModal = () => {
    const { pageYOffset } = window
    setScrollPosition(window.pageYOffset)
    setModalOpen(true)
    document.body.classList.add('scroll-lock')
    document.body.style.top = `-${pageYOffset}px`
  }
  const toggleModal = () => {
    if (isModalOpen) {
      closeModal()
    } else {
      openModal()
    }
  }

  return { modalRef, openModal, closeModal, isModalOpen, toggleModal }
}
