import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import styles from './header.module.scss'
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg'
import SearchInput from '@/components/elements/Header/SearchInput/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'

const HeaderBottom = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="../../public/images/logo.svg" alt="logo" />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}
              >
                Детали для газовых котлов
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
          <button>
            <span>
              <SearchSvg />
            </span>
          </button>
        </div>
        <div>
          <ModeToggler />
          <button>Корзина</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
