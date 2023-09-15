import React from 'react'
import { useSelector } from 'react-redux'

import styles from './catalogPage.module.scss'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'

const CatalogFiltersDesktop = () => {
  console.log()
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Фильтры
      </h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion manufacturersList={[]} title={''} />
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
