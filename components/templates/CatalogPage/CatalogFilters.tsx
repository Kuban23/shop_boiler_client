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
  setBoilerManufacturersFromQuery,
  setFilteredBoilerParts,
  setPartsManufacturersFromQuery,
} from '@/context/boilerParts'
import { getBoilerParts } from '@/context/api/boilerParts'
import { getQueryParamOnFirstRender } from '@/utils/common'

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
  React.useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
      )
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const boilerQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('boiler', router) as string
        )
      )
      const partsQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('parts', router) as string
        )
      )
      const isValidBoilerQuery =
        Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
      const isValidPartsQuery =
        Array.isArray(partsQueryValue) && !!partsQueryValue?.length
      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        router
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (
        isValidBoilerQuery &&
        isValidPartsQuery &&
        priceFromQueryValue &&
        priceToQueryValue
      ) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
        return
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`)
        return
      }

      if (isValidBoilerQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`)
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
      }

      if (isValidPartsQuery && priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`)
        return
      }

      if (isValidBoilerQuery && priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}`)
        return
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction,
    path: string
  ) => {
    callback()
    const data = await getBoilerParts(`/boiler-parts?limit=20&offset=${path}`)
    setFilteredBoilerParts(data)
  }

  async function updateParamsAndFilters<T>(updatedParams: T, path: string) {
    const params = router.query

    delete params.boiler
    delete params.parts
    delete params.priceFrom
    delete params.priceTo

    router.push(
      {
        query: {
          ...params,
          ...updatedParams,
        },
      },
      undefined,
      { shallow: true }
    )

    const data = await getBoilerParts(`/boiler-parts?limit=20&offset=${path}`)

    setFilteredBoilerParts(data)
  }

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
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       boiler: encodedBoilerQuery,
        //       parts: encodedPartsQuery,
        //       priceFrom,
        //       priceTo,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerParts(
        //   `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
        // )
        // setFilteredBoilerParts(data)
        // return
      }
      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       priceFrom,
        //       priceTo,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerParts(
        //   `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
        // )
        // setFilteredBoilerParts(data)
        // return
      }

      if (boilers.length && parts.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${partsQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       boiler: encodedBoilerQuery,
        //       parts: encodedPartsQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerParts(
        //   `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${partsQuery}`
        // )
        // setFilteredBoilerParts(data)
        // return
      }

      if (boilers.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       boiler: encodedBoilerQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerParts(
        //   `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}`
        // )
        // setFilteredBoilerParts(data)
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
