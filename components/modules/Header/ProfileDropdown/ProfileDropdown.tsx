import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './profileDropdown.module.scss'
import LogoutSvg from '@/components/elements/CityButton/LogoutSvg/LogoutSvg'
import { IWrappedComponentProps } from '@/types/common'
import { withClickOutside } from '@/utils/withClickOutside'

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    //ig
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mode = useSelector((state: any) => state.theme)
    // делаю условие по теме и применю стили
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleProfileDropDown = () => setOpen(!open)

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
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
          )}
        </AnimatePresence>
      </div>
    )
  }
)
ProfileDropdown.displayName = 'ProfileDropdown'
export default withClickOutside(ProfileDropdown)
