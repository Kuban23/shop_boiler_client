import { UseFormRegister, FieldErrors } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface ISignUp {
  username: string
  password: string
  email: string
}

export interface ISignIn {
  username: string
  password: string
}
