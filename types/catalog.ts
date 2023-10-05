import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
  title: string
}

export interface IQueryParams {
  offset: string
  firs: string
  boiler: string
  parts: string
  priceFrom: string
  priceTo: string
  partId: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[]
  title: string | false
  setManufacturer: Event<IFilterCheckboxItem[]>
  updateManufacturer: Event<IFilterCheckboxItem>
}

export type IPriceRangeProps = ICatalogFiltersProps

export type ICatalogFilterDesktopProps = ICatalogFiltersProps

export interface ICatalogFiltersProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}
