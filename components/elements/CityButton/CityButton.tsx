import React from 'react'
import { useSelector } from 'react-redux'

import LocationSvg from '../LocationSvg/LocationSvg'
import styles from './city.Botton.module.scss'

const CityButton = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <button className={styles.city}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>
        Санкт-Петербург
      </span>
    </button>
  )
}

export default CityButton
