import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>
  manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
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

export interface ICatalogFiltersProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  // priceRange: number[]
  // setPriceRange: (arg0: number[]) => void
  // setIsPriceRangeChanged: (arg0: boolean) => void
  // resetFilters: VoidFunction
  // resetFilterBtnDisabled: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  isPriceRangeChanged: boolean
  closePopup: VoidFunction
}

export type IPriceRangeProps = ICatalogBaseTypes
// export interface IPriceRangeProps {
//   priceRange: number[]
//   setPriceRange: (arg0: number[]) => void
//   setIsPriceRangeChanged: (arg0: boolean) => void
// }

export interface ICatalogFilterDesktopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  // priceRange: number[]
  // setPriceRange: (arg0: number[]) => void
  // setIsPriceRangeChanged: (arg0: boolean) => void
  // resetFilters: VoidFunction
  // resetFilterBtnDisabled: boolean
  spinner: boolean
  applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
}

export interface IFiltersPopupTop {
  resetBtnText: string
  title: string
  resetFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  closePopup: VoidFunction
}
