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
export const setBoilerManufacturers = boilerParts.createEvent()
// для производителя запчастей
export const setPartsManufacturers = boilerParts.createEvent()

// для изменения производителей котлов и запчастей
export const updateBoilerManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()
export const updatePartsManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()

export const setFilteredBoilerParts = boilerParts.createEvent()

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

// состояние отфильтрованных параметров
export const $filteredBoilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setFilteredBoilerParts, (_, parts) => parts)
