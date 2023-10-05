import React from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
        />
      )}
    </>
  )
}

export default CatalogFilters
