import React from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilters,
  resetFilterBtnDisabled,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner] = React.useState(false)
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
        />
      )}
    </>
  )
}

export default CatalogFilters
