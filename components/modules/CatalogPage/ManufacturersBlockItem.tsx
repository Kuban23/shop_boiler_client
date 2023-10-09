import React from 'react'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'

import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import {
  IFilterCheckboxItem,
  IManufacturersBlockItemProps,
} from '@/types/catalog'
import { $mode } from '@/context/mode'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'

const ManufacturersBlockItem = ({
  item,
  event,
}: IManufacturersBlockItemProps) => {
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  //функция, при нажатии на кнопку delete будет удаляться фильтр и чек бокс тановится не активным
  const removeFilter = () =>
    event({ checked: !item.checked, id: item.id } as IFilterCheckboxItem)

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers__list__item} ${darkModeClass}`}
    >
      <span className={styles.manufacturers__list__item__text}>
        {item.title}
      </span>
      <button
        className={styles.manufacturers__list__item__btn}
        onClick={removeFilter}
      >
        <span>
          <DeleteSvg />
        </span>
      </button>
    </motion.li>
  )
}

export default ManufacturersBlockItem
