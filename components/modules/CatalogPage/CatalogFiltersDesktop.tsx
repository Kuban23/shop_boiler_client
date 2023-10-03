import React from 'react'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import styles from '@/components/templates/CatalogPage/catalogPage.module.scss'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'

const CatalogFiltersDesktop = () => {
  console.log()
  const mode = useStore($mode)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

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
        <FilterManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title="Производитель котлов"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        />
      </div>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturers}
        />
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
