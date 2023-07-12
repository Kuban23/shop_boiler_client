import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '../../templates/AuthPage/authPage.module.scss'
import { IInputs } from '@/types/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { fetchRegister } from '@/redux/slices/auth'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (values: IInputs) => {
    const data = await dispatch(
      fetchRegister({
        username: values.name,
        password: values.password,
        email: values.email,
      })
    )
    if (!data.payload) {
      return alert('Не удалость зарегистрироваться')
    }
    console.log(data)
    resetField('name')
    resetField('email')
    resetField('password')
    switchForm()
  }

  // const onSubmit = (data: IInputs) => {
  //   console.log(data)
  //   resetField('name')
  //   resetField('email')
  //   resetField('password')
  //   switchForm()
  // }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      {/* <input className={styles.form__input} type="text" placeholder="Name" /> */}
      <EmailInput register={register} errors={errors} />
      {/* <input className={styles.form__input} type="text" placeholder="Email" /> */}
      <PasswordInput register={register} errors={errors} />
      {/* <input
        className={styles.form__input}
        type="password"
        placeholder="Password"
      /> */}
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        Зарегистрироваться
      </button>
    </form>
  )
}

export default SignUpForm
