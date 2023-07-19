import React from 'react'

import styles from './header.module.scss'
import HeaderTop from './HeaderTop'

const Header = () => (
  <header className={styles.header}>
    <HeaderTop />
  </header>
)

export default Header
