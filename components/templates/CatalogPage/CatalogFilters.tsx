import React from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setFilteredBoilerParts,
} from '@/context/boilerParts'
import { getBoilerParts } from '@/context/api/boilerParts'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilters,
  resetFilterBtnDisabled,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = React.useState(false)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const router = useRouter()

  // функция которая будет фильтровать запрос при нажатии кнопуи "Показать"
  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const boilers = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
      const boilerQuery = `&boiler=${encodedBoilerQuery}`
      const partsQuery = `&parts=${encodedPartsQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (boilers.length && parts.length && isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              parts: encodedPartsQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
        )
        setFilteredBoilerParts(data)
        return
      }
      if (isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
        )
        setFilteredBoilerParts(data)
        return
      }

      if (boilers.length && parts.length) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${partsQuery}`
        )
        setFilteredBoilerParts(data)
        return
      }

      if (boilers.length) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}`
        )
        setFilteredBoilerParts(data)
      }

      if (parts.length) {
        router.push(
          {
            query: {
              ...router.query,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}`
        )
        setFilteredBoilerParts(data)
      }

      if (boilers.length && isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${priceQuery}`
        )
        setFilteredBoilerParts(data)
      }

      if (parts.length && isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              parts: encodedPartsQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerParts(
          `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}${priceQuery}`
        )
        setFilteredBoilerParts(data)
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
