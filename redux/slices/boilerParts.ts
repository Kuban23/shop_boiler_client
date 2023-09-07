/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit'
import { IBoilerPart } from '@/types/boilerparts'

export interface FilterBoilerParts {
  rows: IBoilerPart[]
}

const initialState: FilterBoilerParts = {
  rows: [],
}

export const sortProductsByPrice = () => ({
  type: 'Сначала дешевые | Сначала дорогие | По популярности',
})

export const filterBoilerPartsSlice = createSlice({
  name: 'filterParts',
  initialState,
  reducers: {
    setBoilerPartsCheapFirst: (state, action) => {
      switch (action.type) {
        case 'Сначала дешевые':
          return {
            ...state,
            rows: state.rows.sort((a, b) => a.price - b.price),
          }
      }
    },
    setBoilerPartsExpensiveFirst: (state, action) => {
      switch (action.type) {
        case 'Сначала дорогие':
          return {
            ...state,
            rows: state.rows.sort((a, b) => b.price - a.price),
          }
      }
    },
    setBoilerPartsByPopularity: (state, action) => {
      switch (action.type) {
        case 'По популярности':
          return {
            ...state,
            rows: state.rows.sort((a, b) => b.popularity - a.popularity),
          }
      }
    },
  },
})

export const {
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
  setBoilerPartsByPopularity,
} = filterBoilerPartsSlice.actions
export default filterBoilerPartsSlice.reducer
