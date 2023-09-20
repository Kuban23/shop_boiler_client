// import { createDomain } from 'effector-next'

// // переменная с доменом mode
// const mode = createDomain()

// // создал событие
// export const setMode = mode.createEvent<string>()

// // создал состояние
// export const $mode = mode
//   .createStore<string>('light')
// подписываю стор на события, когда буду вызывать функцию setMode и передавать в нее строчку с темой light или darck,
//   // тема будет попадать в колбэк (_, mode) => mode и устанавливаться в стор-createStore
//   .on(setMode, (_, mode) => mode)
import { createDomain } from 'effector-next'

const mode = createDomain()

export const setMode = mode.createEvent<string>()

export const $mode = mode
  .createStore<string>('light')
  .on(setMode, (_, mode) => mode)
