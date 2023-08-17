/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

import styles from './footer.module.scss'

const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href="/dashboard" passHref legacyBehavior>
      <a className={styles.footer__top__item__logo}>
        <img src="/images/logo-footer.svg" alt="logo" />
        <span className={styles.footer__top__item__logo__text}>
          Магазин газовых котлов
        </span>
      </a>
    </Link>
  </div>
)

export default FooterLogo
