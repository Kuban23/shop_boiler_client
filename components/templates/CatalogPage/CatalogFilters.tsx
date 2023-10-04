import React from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop'

const CatalogFilters = () => {
  const isMobile = useMediaQuery(820)
  return <>{isMobile ? <div /> : <CatalogFiltersDesktop />}</>
}

export default CatalogFilters
