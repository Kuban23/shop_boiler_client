import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../app/axiosClient'
import { IBoilerPart } from '@/types/boilerparts'
import { IQueryParams } from '@/types/catalog'

// Делаю асинхронный экшн для запроса товара-новинок
export const getNewParts = createAsyncThunk(
  'parts/getBestsellersOrNewParts',
  async () => {
    const { data } = await axios.get('/boiler-parts/new')
    return data
  }
)

// Делаю асинхронный экшн для запроса товара
// export const getBoilerParts = createAsyncThunk(
//   'parts/getBoilerParts',
//   async () => {
//     const { data } = await axios.get('/boiler-parts?limit=20&offset=0')
//     return data
//   }
// )

// Делаю асинхронный экшн для запроса товара
export const getHandlePaginationPage = createAsyncThunk(
  'parts/getHandlePaginationPage',
  async ({ query }: { query: IQueryParams }) => {
    const offset = +query.offset - 1
    const { data } = await axios.get(`/boiler-parts?limit=20&offset=${offset}`)
    return data
  }
)

// Делаю асинхронный экшн для запроса товара по клику по кнопкам пагинации
export const getHandleSelectedPage = createAsyncThunk(
  'parts/getHandleSelectedPage',
  async ({ selected }: { selected: number }) => {
    const { data } = await axios.get(
      `/boiler-parts?limit=20&offset=${selected}`
    )
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
    setBoilerParts: (state, action: PayloadAction<IBoilerPart[]>) => {
      state.items = action.payload
    },
  },

  // запрос товара-новинок
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
    // запрос товара-для каталога
    // builder.addCase(getBoilerParts.pending, (state) => {
    //   state.status = Status.LOADING
    //   state.items = []
    // })
    // builder.addCase(getBoilerParts.fulfilled, (state, action) => {
    //   state.items = action.payload
    //   state.status = Status.SACCESS
    // })
    // builder.addCase(getBoilerParts.rejected, (state) => {
    //   state.status = Status.ERROR
    //   state.items = []
    // })
    // пагинация
    builder.addCase(getHandlePaginationPage.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(getHandlePaginationPage.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(getHandlePaginationPage.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })

    builder.addCase(getHandleSelectedPage.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(getHandleSelectedPage.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(getHandleSelectedPage.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { getNew, setBoilerParts } = newPartsSlice.actions
export default newPartsSlice.reducer
