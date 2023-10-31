import React from 'react'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { IFiltersPopupTop } from '@/types/catalog'

const FiltersPopupTop = ({
  title,
  resetBtnText,
  resetFilters,
  resetFilterBtnDisabled,
  closePopup,
}: IFiltersPopupTop) => {
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button
        onClick={closePopup}
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        {title}
      </button>
      <button
        className={styles.catalog__bottom__filters__reset}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  )
}

export default FiltersPopupTop
