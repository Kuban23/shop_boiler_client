import React from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { IManufacturersBlockProps } from '@/types/catalog'
import { $mode } from '@/context/mode'
import ManufacturersBlockItem from './ManufacturersBlockItem'

const ManufacturersBlock = ({
  title,
  event,
  manufacturersList,
}: IManufacturersBlockProps) => {
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const checkedItems = manufacturersList.filter((item) => item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers} ${darkModeClass}`}
    >
      <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
        {title}
      </h3>
      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          {checkedItems.map((item) => (
            <ManufacturersBlockItem key={item.id} item={item} event={event} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default ManufacturersBlock
