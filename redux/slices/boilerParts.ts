import { createSlice } from '@reduxjs/toolkit'
import { IBoilerPart } from '@/types/boilerparts'

export interface FilterBoilerParts {
  rows: IBoilerPart[]
}

const initialState: FilterBoilerParts = {
  rows: [],
}

export const filterBoilerPartsSlice = createSlice({
  name: 'filterParts',
  initialState,
  reducers: {
    setBoilerPartsCheapFirst: (state) => {
      state.rows.sort((a, b) => a.price - b.price)
    },
  },
})

export const { setBoilerPartsCheapFirst } = filterBoilerPartsSlice.actions
export default filterBoilerPartsSlice.reducer
