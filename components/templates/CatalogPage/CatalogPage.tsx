import React from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { useAppDispatch } from '@/redux/store'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

import styles from './catalogPage.module.scss'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import {
  getBoilerParts,
  getHandlePaginationPage,
  getHandleSelectedPage,
  setBoilerParts,
} from '@/redux/slices/newBoilerParts'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import { IQueryParams } from '@/types/catalog'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const [skeleton, setSkeleton] = React.useState(false)

  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0

  // состояние которое опирается на queryпараметры, буду передавать current page в forcePage
  // таким образом при перезагрузке отрисовывать нужную страницу с элементами
  const [currentPage, setCurrentPage] = React.useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const boilerParts = useSelector((state: IBoilerParts) => state.newParts.items)

  const dispatch = useAppDispatch()
  const router = useRouter()

  // функция по получанию  товара с сервера
  const loadBoilerParts = async () => {
    try {
      setSkeleton(true)
      const data = await dispatch(getBoilerParts())
      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })
        resetPagination(data)
        return
      }
      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )
          setCurrentPage(0)
          setBoilerParts(data)
          return
        }
      }
      const offset = +query.offset - 1
      // const result = await getBoilerPartsFx(
      //   `/boiler-parts?limit=20&offset=${offset}`)
      const result = await dispatch(getHandlePaginationPage())
      setCurrentPage(offset)
      setBoilerParts(result)
    } catch (error) {
      // toast.error((error as Error).message)
    } finally {
      setSkeleton(false)
    }
  }

  // эффект который при загрузке каталога подгружать товары
  React.useEffect(() => {
    loadBoilerParts()
    console.log(boilerParts.rows)
  }, [])

  // console.log(boilerParts)

  // логика определения кол-ва страниц
  const pagesCount = Math.ceil(boilerParts.count / 20)

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  //Функция для клика пагинации
  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await dispatch(getBoilerParts())
      if (selected > pagesCount) {
        resetPagination(data)
        return
      }
      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }
      // const result = await getBoilerPartsFx(
      //   `/boiler-parts?limit=20&offset=${selected}
      const result = await dispatch(getHandleSelectedPage())
      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )
      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (error) {}
  }

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
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
