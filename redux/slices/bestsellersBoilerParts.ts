import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../app/axiosClient'
import { IBoilerPart } from '@/types/boilerparts'

// Делаю асинхронный экшн для запроса товара
export const getBestsellersParts = createAsyncThunk(
  'parts/getBestsellersOrNewParts',
  async () => {
    const { data } = await axios.get('/boiler-parts/bestsellers', {})
    return data
  }
)

export enum Status {
  LOADING = 'loading',
  SACCESS = 'success',
  ERROR = 'error',
}

// типизирую состояние
interface BestsellersPartsState {
  items: IBoilerPart[]
  // Статус запроса
  status: Status
}

const initialState: BestsellersPartsState = {
  items: [],
  // Статус запроса
  status: Status.LOADING, // isLoading| success| error
}

export const bestsellersPartsSlice = createSlice({
  name: 'bestsellers',
  initialState,
  reducers: {
    getBestsellers: (state, action: PayloadAction<IBoilerPart[]>) => {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getBestsellersParts.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(getBestsellersParts.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(getBestsellersParts.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { getBestsellers } = bestsellersPartsSlice.actions
export default bestsellersPartsSlice.reducer
