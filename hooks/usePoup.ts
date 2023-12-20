import { setSearchInputZIndex } from '@/context/header'
import {
  removeClassNamesForOverlayAndBody,
  toggleClassNamesForOverlayAndBody,
} from '@/utils/common'
import React from 'react'

export const usePopup = () => {
  const [open, setOpen] = React.useState(false)

  // Функция открытия попапа
  const toggleOpen = () => {
    window.scrollTo(0, 0)
    toggleClassNamesForOverlayAndBody
    // document.querySelector('.overlay')?.classList.toggle('.open')
    // document.querySelector('.body')?.classList.toggle('overflow-hidden')
    setOpen(!open)
  }

  // Функция закрытия попапа
  const closePopup = () => {
    removeClassNamesForOverlayAndBody()
    // document.querySelector('.overlay')?.classList.remove('.open')
    // document.querySelector('.body')?.classList.remove('overflow-hidden')
    setOpen(false)
    setSearchInputZIndex(1)
  }

  React.useEffect(() => {
    const overlay = document.querySelector('.overlay')
    // при нажатии на оверлэй закрываю меню
    overlay?.addEventListener('click', closePopup)
    return () => overlay?.removeEventListener('click', closePopup)
  }, [open])

  return { toggleOpen, open, closePopup }
}
