import React from 'react'
import { AnimatePresence } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'

import styles from './catalogPage.module.scss'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import { IQueryParams } from '@/types/catalog'
import { $mode } from '@/context/mode'
import { getBoilerParts } from '@/context/api/boilerParts'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { toast } from 'react-toastify'
import CatalogFilters from './CatalogFilters'
import { usePopup } from '@/hooks/usePoup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const [skeleton, setSkeleton] = React.useState(false)
  const [priceRange, setPriceRange] = React.useState([1000, 9000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState(false)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0

  // состояние которое опирается на queryпараметры, буду передавать current page в forcePage
  // таким образом при перезагрузке отрисовывать нужную страницу с элементами
  const [currentPage, setCurrentPage] = React.useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const [isFilterInQuery, setIsFilterInQuery] = React.useState(false)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)

  const { toggleOpen, open, closePopup } = usePopup()

  const mode = useStore($mode)
  const boilerParts = useStore($boilerParts)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const router = useRouter()

  // функция- получаю товары с сервера
  const loadBoilerParts = async () => {
    try {
      setSkeleton(true)
      const data = await getBoilerParts('/boiler-parts?limit=20&offset=0')
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
          setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
          return
        }
        const offset = +query.offset - 1
        const result = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${offset}`
        )
        setCurrentPage(offset)
        setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
        return
      }
      setCurrentPage(0)
      setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSkeleton(false)
    }
  }

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )

  // эффект который при загрузке каталога подгружать товары
  React.useEffect(() => {
    loadBoilerParts()
  }, [filteredBoilerParts, isFilterInQuery])

  console.log(boilerParts.rows)

  // логика определения кол-ва страниц
  const pagesCount = Math.ceil(boilerParts.count / 20)

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  //Функция для клика пагинации
  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSkeleton(true)
      const data = await getBoilerParts('/boiler-parts?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } =
        checkQueryParams(router)

      const result = await getBoilerParts(
        `/boiler-parts?limit=20&offset=${selected}${
          isFilterInQuery && isValidBoilerQuery
            ? `&boiler=${router.query.boiler}`
            : ''
        }${
          isFilterInQuery && isValidPartsQuery
            ? `&parts=${router.query.parts}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

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
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSkeleton(false), 1000)
    }
  }

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  // функция для сброса всех фильтров
  const resetFilters = async () => {
    try {
      const data = await getBoilerParts('/boiler-parts?limit=20&offset=0')
      const params = router.query

      delete params.boiler
      delete params.parts
      delete params.priceFrom
      delete params.priceTo
      params.first = 'cheap'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setBoilerParts(data)
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSkeleton(false), 1000)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель котлов:"
                event={updateBoilerManufacturer}
                manufacturersList={boilerManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей:"
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSkeleton={setSkeleton} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilters={resetFilters}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {/* <div>Фильтр....</div> */}
            {skeleton ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
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
            forcePage={currentPage} // страница на которую идет переход
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
