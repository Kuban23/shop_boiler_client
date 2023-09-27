import React from 'react'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'

import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { IManufacturersBlockProps } from '@/types/catalog'
import { $mode } from '@/context/mode'

const ManufacturersBlock = ({ title }: IManufacturersBlockProps) => {
  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

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
        {[].map((item) => (
          <li key={item} />
        ))}
      </ul>
    </motion.div>
  )
}

export default ManufacturersBlock
