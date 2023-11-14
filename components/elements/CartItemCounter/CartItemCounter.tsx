import React from 'react'
import { useStore } from 'effector-react'

import { ICartItemCounterProps } from '@/types/shopping-cart'
import { $mode } from '@/context/mode'
import styles from '../../modules/Header/CartPopup/CartPopup.module.scss'
import MinusSvg from '../MinusSvg/MinusSvg'
import PlusSvg from '../PlusSvg/PlusSvg'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CartItemCounter = ({
  totalCount,
  partId,
  increasePrice,
  decreasePrice,
  initialCount,
}: ICartItemCounterProps) => {
  const [spinner, setPinner] = React.useState(false)
  const [count, setCount] = React.useState(initialCount)

  // получаю длступ к стору
  const mode = useStore($mode)

  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${skeletonStyles.dark_mode}`

  return (
    <div
      className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
    >
      <button>
        <MinusSvg />
      </button>
      <span>
        {spinner ? (
          <span
            className={`${skeletonStyles.spinner} ${spinnerDarkModeClass}`}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button>
        <PlusSvg />
      </button>
    </div>
  )
}

export default CartItemCounter
