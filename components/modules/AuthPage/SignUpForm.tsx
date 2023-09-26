import React from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'

import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '../../templates/AuthPage/authPage.module.scss'
import { IInputs } from '@/types/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import spinnerStyles from '@/components/modules/AuthPage/spinner/index.module.scss'
// import { toast } from 'react-toastify'
import { showAuthError } from '@/utils/errors'
import { singUp } from '@/context/api/auth'
import { $mode } from '@/context/mode'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const [spinner, setSpinner] = React.useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      //делаю запрос на сервер
      const userData = await singUp({
        url: '/users/signup',
        username: data.name,
        password: data.password,
        email: data.email,
      })
      // Если не юзер, то сбразваю запрос и анимация с входом не работает
      if (!userData) {
        return
      }
      resetField('email')
      resetField('name')
      resetField('password')
      switchForm()
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  const mode = useStore($mode)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
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
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} />
        ) : (
          'Зарегистрироваться'
        )}
      </button>
    </form>
  )
}

export default SignUpForm
