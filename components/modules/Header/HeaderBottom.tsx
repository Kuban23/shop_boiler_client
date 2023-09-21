import React from 'react'
import { useStore } from 'effector-react'
import Link from 'next/link'

import styles from './header.module.scss'
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg'
import SearchInput from '@/components/elements/Header/SearchInput/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { $mode } from '@/context/mode'

const HeaderBottom = () => {
  //    <ModeToggler /> будет переходить в бургер меню, для это заюзаю хук useMediaQuery
  const isMedia950 = useMediaQuery(950)
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/images/logo.svg" alt="logo" />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}
              >
                Магазин газовых котлов
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
          <button className={`${styles.header__searcht__btn} ${darkModeClass}`}>
            <span className={styles.header__searcht__btn__span}>
              <SearchSvg />
            </span>
          </button>
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
          {/* <button>Корзина</button> */}
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
