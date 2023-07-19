import React, { MutableRefObject } from 'react'
import { useSelector } from 'react-redux'

import styles from './authPage.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SignUpForm from '@/components/modules/AuthPage/SignUpForm'
import SigInForm from '@/components/modules/AuthPage/SignInForm'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
const AuthPage = () => {
  const switchCtn = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchC1 = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchC2 = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle1 = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle2 = React.useRef() as MutableRefObject<HTMLDivElement>
  const aContainer = React.useRef() as MutableRefObject<HTMLDivElement>
  const bContainer = React.useRef() as MutableRefObject<HTMLDivElement>
  // Применил кастомный хук чтобы убрать после 800 текст и описание
  const isMedia800 = useMediaQuery(800)

  // console.log(switchC2)
  const switchForm = () => {
    switchCtn.current.classList.add(styles.is_gx)
    setTimeout(() => {
      switchCtn.current.classList.remove(styles.is_gx)
    }, 1000)

    switchCtn.current.classList.toggle(styles.is_txr)
    switchCircle1.current.classList.toggle(styles.is_txr)
    switchCircle2.current.classList.toggle(styles.is_txr)

    switchC1.current.classList.toggle(styles.is_hidden)
    switchC2.current.classList.toggle(styles.is_hidden)
    aContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_z200)
  }

  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.main} ${darkModeClass}`}>
      <div className="styles.mode_toggle">
        <ModeToggler />
      </div>
      <div
        className={`${styles.container} ${styles.a_container} ${darkModeClass}`}
        id="a-container"
        ref={aContainer}
      >
        <div className={styles.container__inner}>
          <SignUpForm switchForm={switchForm} />
        </div>
      </div>
      <div
        className={`${styles.container} ${styles.b_container} ${darkModeClass}`}
        id="b-container"
        ref={bContainer}
      >
        <div className={styles.container__inner}>
          <SigInForm />
        </div>
      </div>
      <div
        className={`${styles.switch} ${darkModeClass}`}
        id="switch-cnt"
        ref={switchCtn}
      >
        <div
          className={`${styles.switch__circle} ${darkModeClass}`}
          ref={switchCircle1}
        />
        <div
          className={`${styles.switch__circle} ${styles.switch__circle__t} ${darkModeClass}`}
          ref={switchCircle2}
        />
        <div className={styles.switch__container} id="switch-c1" ref={switchC1}>
          {!isMedia800 && (
            <>
              <h2
                className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}
              >
                Добро пожаловать!
              </h2>
              <p
                className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}
              >
                Чтобы оставаться на связи с нами, пожалуйста, войдите под своей
                личной информацией
              </p>
            </>
          )}
          <button
            onClick={switchForm}
            className={`${styles.switch__button} ${styles.button} ${styles.switch_btn} ${darkModeClass}`}
          >
            Войти
          </button>
        </div>
        <div
          className={`${styles.switch__container} ${styles.is_hidden}`}
          id="switch-c2"
          ref={switchC2}
        >
          {!isMedia800 && (
            <>
              <h2
                className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}
              >
                Привет!
              </h2>
              <p
                className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}
              >
                Введите свои личные данные
              </p>
            </>
          )}
          <button
            onClick={switchForm}
            className={`${styles.switch__button} ${styles.button} ${styles.switch_btn} ${darkModeClass}`}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
