import React from 'react'

import styles from './header.module.scss'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

const Header = () => (
  <header className={styles.header}>
    <HeaderTop />
    <HeaderBottom />
  </header>
)

export default Header
