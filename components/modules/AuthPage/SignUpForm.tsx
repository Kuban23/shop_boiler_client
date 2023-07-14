import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '../../templates/AuthPage/authPage.module.scss'
import { IInputs } from '@/types/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { fetchRegister } from '@/redux/slices/auth'
import spinnerStyles from '@/components/modules/AuthPage/spinner/index.module.scss'
import { toast } from 'react-toastify'
import { showAuthError } from '@/utils/errors'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
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
        fetchRegister({
          username: data.name,
          password: data.password,
          email: data.email,
        })
      )
      if (!userData.payload) {
        toast('Не удалость зарегистрироваться')
        // return alert('Не удалость зарегистрироваться')
      }
      toast(userData.payload.warningMessage)
      console.log(userData)
      resetField('name')
      resetField('email')
      resetField('password')
      switchForm()
    } catch (error) {
      //console.log(error)
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

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
