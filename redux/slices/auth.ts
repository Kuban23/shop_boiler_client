import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../app/axiosClient'
import { ISignUpFx } from '@/types/auth'

// Делаю асинхронный экшн для залогивания использования- будем делать запрос на БЭК для авторизации
export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({ username, password, email }: ISignUpFx) => {
    const res = await axios.post('/users/signup', {
      username,
      password,
      email,
    })
    return res.data
  }
)

// type userState = {
//   username: string
//   password: string
//   email: string
// }

export enum Status {
  LOADING = 'loading',
  SACCESS = 'success',
  ERROR = 'error',
}

interface authSliceState {
  status: Status
  data: ISignUpFx | null
}
const initialState: authSliceState = {
  data: null, // инф-я о пользователе будет храниться в data
  status: Status.LOADING,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.data = null
    // },
  },

  // Для того чтобы запрос проходил используем extraReducers
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
  },
  // extraReducers: {
  //   [fetchAuth.pending]: (state) => {
  //     state.status = 'loading'
  //     state.data = null
  //   },
  //   [fetchAuth.fulfilled]: (state, action) => {
  //     state.status = 'success'
  //     state.data = action.payload
  //   },
  //   [fetchAuth.rejected]: (state) => {
  //     state.status = 'error'
  //     state.data = null
  //   },
  // },
})

export default authSlice.reducer
