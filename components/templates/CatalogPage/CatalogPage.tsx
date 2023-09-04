import React from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { useAppDispatch } from '@/redux/store'

import styles from './catalogPage.module.scss'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { getBoilerParts, setBoilerParts } from '@/redux/slices/newBoilerParts'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'

const CatalogPage = () => {
  const [skeleton, setSkeleton] = React.useState(false)

  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const boilerParts = useSelector((state: IBoilerParts) => state.newParts.items)

  const dispatch = useAppDispatch()

  // функция по получанию  товара с сервера
  const loadBoilerParts = async () => {
    try {
      setSkeleton(true)
      const data = await dispatch(getBoilerParts())
      setBoilerParts(data)
    } catch (error) {
      // toast.error((error as Error).message)
    } finally {
      setSkeleton(false)
    }
  }

  // эффект который при загрузке каталога подгружать товары
  React.useEffect(() => {
    loadBoilerParts()
  }, [])

  // console.log(boilerParts)

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ManufacturersBlock title="Производитель котлов:" />
          </AnimatePresence>
          <AnimatePresence>
            <ManufacturersBlock title="Производитель запчастей:" />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={true}
            >
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className="">Фильтры</div>
            {skeleton ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
