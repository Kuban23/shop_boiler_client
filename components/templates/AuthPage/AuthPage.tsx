import React, { MutableRefObject } from 'react'

import styles from './authPage.module.scss'
const AuthPage = () => {
  const switchCtn = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchC1 = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchC2 = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle1 = React.useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle2 = React.useRef() as MutableRefObject<HTMLDivElement>
  const aContainer = React.useRef() as MutableRefObject<HTMLDivElement>
  const bContainer = React.useRef() as MutableRefObject<HTMLDivElement>

  // const switchCtn: MutableRefObject<HTMLDivElement> = React.useRef()
  // // let switchCtn = useRef() as MutableRefObject<HTMLDivElement>
  // const switchC1: MutableRefObject<HTMLDivElement> = React.useRef()
  // // const switchC1 = document.querySelector('#switch-c1')
  // const switchC2: MutableRefObject<HTMLDivElement> = React.useRef()
  // // const switchC2 = document.querySelector('#switch-c2')
  // const switchCircle1: MutableRefObject<HTMLDivElement> = React.useRef()
  // const switchCircle2: MutableRefObject<HTMLDivElement> = React.useRef()
  // // const switchCircle = document.querySelectorAll('.switch__circle')
  // const switchBtn: MutableRefObject<HTMLDivElement> = React.useRef()
  // // const switchBtn = document.querySelectorAll('.switch-btn')
  // const aContainer: MutableRefObject<HTMLDivElement> = React.useRef()
  // // const aContainer = document.querySelector('#a-container')
  // const bContainer: MutableRefObject<HTMLDivElement> = React.useRef()
  // // const bContainer = document.querySelector('#b-container')
  console.log(switchC2)
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

  return (
    <div className={styles.main}>
      <div
        className={`${styles.container} ${styles.a_container}`}
        id="a-container"
        ref={aContainer}
      >
        <div className={styles.container__inner}>
          <form className={styles.form}>
            <h2 className={`${styles.form__title} ${styles.title}`}>
              Создать аккаунт
            </h2>
            <input
              className={styles.form__input}
              type="text"
              placeholder="Name"
            />
            <input
              className={styles.form__input}
              type="text"
              placeholder="Email"
            />
            <input
              className={styles.form__input}
              type="password"
              placeholder="Password"
            />
            <button
              className={`${styles.form__button} ${styles.button} ${styles.submit}`}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
      <div
        className={`${styles.container} ${styles.bcontainer}`}
        id="b-container"
        ref={bContainer}
      >
        <div className={styles.container__inner}>
          <form className={styles.form}>
            <h2 className={`${styles.form__title} ${styles.title}`}>
              Войдите на сайт
            </h2>
            <input
              className={styles.form__input}
              type="text"
              placeholder="Email"
            />
            <input
              className={styles.form__input}
              type="password"
              placeholder="Password"
            />
            <button
              className={`${styles.form__button} ${styles.button} ${styles.submit}`}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
      <div className={styles.switch} id="switch-cnt" ref={switchCtn}>
        <div className={styles.switch__circle} ref={switchCircle1} />
        <div
          className={`${styles.switch__circle} ${styles.switch__circle__t}`}
          ref={switchCircle2}
        />
        <div className={styles.switch__container} id="switch-c1" ref={switchC1}>
          <h2 className={`${styles.switch__title} ${styles.title}`}>
            Добро пожаловать!
          </h2>
          <p className={`${styles.switch__description} ${styles.description}`}>
            Чтобы оставаться на связи с нами, пожалуйста, войдите под своей
            личной информацией
          </p>
          <button
            onClick={switchForm}
            className={`${styles.switch__button} ${styles.button} ${styles.switch_btn}`}
          >
            Войти
          </button>
        </div>
        <div
          className={`${styles.switch__container} ${styles.is_hidden}`}
          id="switch-c2"
          ref={switchC2}
        >
          <h2 className={`${styles.switch__title} ${styles.title}`}>
            Привет, друг!
          </h2>
          <p className={`${styles.switch__description} ${styles.description}`}>
            Введите свои личные данные
          </p>
          <button
            onClick={switchForm}
            className={`${styles.switch__button} ${styles.button} ${styles.switch_btn}`}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
