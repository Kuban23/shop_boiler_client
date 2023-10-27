import { IBoilerParts } from '@/types/boilerparts'
import { IFilterCheckboxItem } from '@/types/catalog'
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog'
import { createDomain } from 'effector-next'

// переменная с доменом boilerParts
const boilerParts = createDomain()

// создал событие
export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()
export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularity = boilerParts.createEvent()
// для производителя котлов
export const setBoilerManufacturers =
  boilerParts.createEvent<IFilterCheckboxItem[]>()
// для производителя запчастей
export const setPartsManufacturers =
  boilerParts.createEvent<IFilterCheckboxItem[]>()

// для изменения производителей котлов и запчастей
export const updateBoilerManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()
export const updatePartsManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()
export const setFilteredBoilerParts = boilerParts.createEvent()
export const setBoilerManufacturersFromQuery =
  boilerParts.createEvent<string[]>()
export const setPartsManufacturersFromQuery =
  boilerParts.createEvent<string[]>()

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

// функция для сторов updateBoilerManufacturer, updatePartsManufacturer
const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }
    return item
  })

// создал состояние стора
export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)
  .on(setBoilerPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setBoilerPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setBoilerPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

//состояние производителей котлов
export const $boilerManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(
    boilerManufacturers as IFilterCheckboxItem[]
  )
  .on(setBoilerManufacturers, (_, parts) => parts)
  .on(updateBoilerManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setBoilerManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

//состояние производителей запчастей
export const $partsManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

// состояние отфильтрованных параметров
export const $filteredBoilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setFilteredBoilerParts, (_, parts) => parts)
