import React from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

import styles from './partPage.module.scss'
import { $boilerPart } from '@/context/boilerPart'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'

const PartPage = () => {
  const mode = useStore($mode)
  const boilerPart = useStore($boilerPart)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {boilerPart.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartPage
