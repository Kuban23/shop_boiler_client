import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import React from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './profileDropdown.module.scss'
import LogoutSvg from '@/components/elements/CityButton/LogoutSvg/LogoutSvg'

const ProfileDropdown = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div className={styles.profile}>
      <button className={styles.profile__btn}>
        <span className={styles.profile__span}>
          <ProfileSvg />
        </span>
      </button>
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={`${styles.profile__dropdown} ${darkModeClass}`}
          style={{ transformOrigin: 'right top' }}
        >
          <li className={styles.profile__dropdown__user}>
            <span
              className={`${styles.profile__dropdown__username} ${darkModeClass}`}
            >
              Ира
            </span>
            <span
              className={`${styles.profile__dropdown__email} ${darkModeClass}`}
            >
              ira@gmail.com
            </span>
          </li>
          <li className={styles.profile__dropdown__item}>
            <button className={styles.profile__dropdown__item__btn}>
              <span
                className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
              >
                Выйти
              </span>
              <span
                className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
              >
                <LogoutSvg />
              </span>
            </button>
          </li>
        </motion.ul>
      </AnimatePresence>
    </div>
  )
}

export default ProfileDropdown
