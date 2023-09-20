import React from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '../../templates/AuthPage/authPage.module.scss'
import { IInputs } from '@/types/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import spinnerStyles from '@/components/modules/AuthPage/spinner/index.module.scss'
import { showAuthError } from '@/utils/errors'
import { singIn } from '@/context/api/auth'
import { $mode } from '@/context/mode'

const SigInForm = () => {
  const [spinner, setSpinner] = React.useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await singIn({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })

      resetField('name')
      resetField('password')
      route.push('/dashboard')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
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
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'Войти'}
      </button>
    </form>
  )
}

export default SigInForm
