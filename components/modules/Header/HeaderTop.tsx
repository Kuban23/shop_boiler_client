import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import styles from './header.module.scss'
import CityButton from '@/components/elements/CityButton/CityButton'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { usePopup } from '@/hooks/usePoup'

const HeaderTop = () => {
  //получаю доступ к переменным из своего хука
  const { toggleOpen, open, closePopup } = usePopup()

  //    <ModeToggler /> будет переходить в бургер меню, для это заюзаю хук useMediaQuery
  const isMedia950 = useMediaQuery(950)
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button
            className={`${styles.burger_menu} ${darkModeClass} ${
              open ? styles.open : ''
            }`}
            onClick={toggleOpen}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <nav
          className={`${styles.header__nav} ${
            open ? styles.open : ''
          } ${darkModeClass}`}
        >
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/shipping-payment" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Доставка и оплата
                </a>
              </Link>
            </li>

            <li className={styles.header__nav__list__item}>
              <Link href="/about" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  О компании
                </a>
              </Link>
            </li>

            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Каталог
                </a>
              </Link>
            </li>

            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Контакты
                </a>
              </Link>
            </li>

            <li className={styles.header__nav__list__item}>
              <Link href="/wholesale-buyers" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Оптовым покупателям
                </a>
              </Link>
            </li>
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )}
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
