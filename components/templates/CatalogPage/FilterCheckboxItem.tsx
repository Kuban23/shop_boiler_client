import { useStore } from 'effector-react'

import { IFilterCheckboxItem } from '@/types/catalog'
import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { $mode } from '@/context/mode'

const FilterCheckboxItem = ({
  title,
  checked,
  id,
  event,
}: IFilterCheckboxItem) => {
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleFilterChange = () =>
    event({ checked: !checked, id } as IFilterCheckboxItem)

  return (
    <li
      className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}
    >
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleFilterChange}
        />
        <span>{title}</span>
      </label>
    </li>
  )
}

export default FilterCheckboxItem
