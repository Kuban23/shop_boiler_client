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
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[]
  title: string | false
  // setManufacturer: Event<IFilterCheckboxItem[]>
  // updateManufacturer: Event<IFilterCheckboxItem>
}
