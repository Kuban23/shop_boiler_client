import React from 'react'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'

const CatalogFiltersMobile = ({}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div
    className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <div className={styles.catalog__bottom__filters__inner}></div>
      <div className={styles.filters__actions}></div>
    </div>
  )
}

export default CatalogFiltersMobile
