import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../app/axiosClient'
import { IBoilerPart } from '@/types/boilerparts'

// Делаю асинхронный экшн для запроса товара
export const getNewParts = createAsyncThunk(
  'parts/getBestsellersOrNewParts',
  async () => {
    const { data } = await axios.get('/boiler-parts/new')
    return data
  }
)

export enum Status {
  LOADING = 'loading',
  SACCESS = 'success',
  ERROR = 'error',
}

// типизирую состояние
interface newPartsSlice {
  items: IBoilerPart[]
  // Статус запроса
  status: Status
}

const initialState: newPartsSlice = {
  items: [],
  // Статус запроса
  status: Status.LOADING, // isLoading| success| error
}

export const newPartsSlice = createSlice({
  name: 'newParts',
  initialState,
  reducers: {
    getNew: (state, action: PayloadAction<IBoilerPart[]>) => {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNewParts.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(getNewParts.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(getNewParts.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { getNew } = newPartsSlice.actions
export default newPartsSlice.reducer
