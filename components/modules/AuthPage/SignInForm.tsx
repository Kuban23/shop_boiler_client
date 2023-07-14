import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '../../templates/AuthPage/authPage.module.scss'
import { IInputs } from '@/types/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { fetchLogin } from '@/redux/slices/auth'
import spinnerStyles from '@/components/modules/AuthPage/spinner/index.module.scss'
import { showAuthError } from '@/utils/errors'
import { toast } from 'react-toastify'

const SigInForm = () => {
  const [spinner, setSpinner] = React.useState(false)

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchLogin({
          username: data.name,
          password: data.password,
        })
      )
      if (!userData.payload) {
        toast('Неверное имя пользователя или пароль')
        // return alert('Неверное имя пользователя или пароль')
      }
      toast(userData.payload.warningMessage)
      console.log(userData)
      resetField('name')
      resetField('password')
    } catch (error) {
      showAuthError(error)
      console.log(error)
    } finally {
      setSpinner(false)
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>
        Войдите на сайт
      </h2>
      <NameInput register={register} errors={errors} />
      {/* <input className={styles.form__input} type="text" placeholder="Name" /> */}
      <PasswordInput register={register} errors={errors} />
      {/* <input
        className={styles.form__input}
        type="password"
        placeholder="Password"
      /> */}
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'Войти'}
      </button>
    </form>
  )
}

export default SigInForm
