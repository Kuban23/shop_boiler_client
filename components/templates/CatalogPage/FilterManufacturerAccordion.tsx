import React from 'react'
import { useSelector } from 'react-redux'

import styles from './catalogPage.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterManufacturerAccordionProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'

const FilterManufacturerAccordion = ({
  manufacturersList,
  title,
  updateManufacturer,
}: IFilterManufacturerAccordionProps) => {
  console.log()
  const isMobile = useMediaQuery(820)
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__manufacturer__inner}>
        <button className={styles.filters__manufacturer__select_all}>
          Выбрать все
        </button>
        <ul className={styles.filters__manufacturer__list}>
          {manufacturersList.map((item) => (
            <FilterCheckboxItem
              title={item.title}
              id={item.id}
              key={item.id}
              checked={item.checked}
              event={updateManufacturer}
            />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  )
}

export default FilterManufacturerAccordion
