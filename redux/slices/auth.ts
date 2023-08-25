import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../app/axiosClient'
import { ISignIn, ISignUp } from '@/types/auth'
// import { AxiosRequestConfig } from 'axios'

// Делаю асинхронный экшн для регистрации пользования
export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({ username, password, email }: ISignUp) => {
    const { data } = await axios.post('/users/signup', {
      username,
      password,
      email,
    })
    return data
  }
)

// Делаю асинхронный экшн для залогивания пользования
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async ({ username, password }: ISignIn) => {
    const { data } = await axios.post('/users/login', {
      username,
      password,
    })
    return data
  }
)

// Делаю асинхронный экшн для проверки пользвателя
export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async () => {
    const { data } = await axios.get('/users/login-check')
    return data
  }
)
// export const checkUserAuth = createAsyncThunk(
//   'auth/checkUserAuth',
//   async ({ userId, username, email }: ILoginCheck) => {
//     const { data } = await axios.get('/users/login-check', {
//       userId,
//       username,
//       email,
//     } as AxiosRequestConfig<{ userId: number; username: string; password: string }>)
//     return data
//   }
// )

export enum Status {
  LOADING = 'loading',
  SACCESS = 'success',
  ERROR = 'error',
}

interface authSliceState {
  status: Status
  data: ISignUp | null
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
    // запрос на регистрацию
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

    // Запрос на логин
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })

    // для проверки пользвателя
    builder.addCase(checkUserAuth.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = Status.SACCESS
    })
    builder.addCase(checkUserAuth.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
  },
})

export default authSlice.reducer
