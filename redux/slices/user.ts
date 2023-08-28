import { IUser } from '@/types/auth'
import { createSlice } from '@reduxjs/toolkit'

interface UserSliceState {
  user: IUser
}

const initialState: UserSliceState = {
  user: {} as IUser,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => (state.user = action.payload),
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
