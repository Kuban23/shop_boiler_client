import React from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import { ICartItemCounterProps } from '@/types/shopping-cart'
import { $mode } from '@/context/mode'
import styles from '../../modules/Header/CartPopup/CartPopup.module.scss'
import MinusSvg from '../MinusSvg/MinusSvg'
import PlusSvg from '../PlusSvg/PlusSvg'
//import skeletonStyles from '@/styles/skeleton/index.module.scss'
import spinnerStyles from '../../modules/AuthPage/spinner/index.module.scss'
import { updateCartItemCount } from '@/context/shopping-cart'
import { updateCartItem } from '@/context/api/shopping-cart'

const CartItemCounter = ({
  totalCount,
  partId,
  increasePrice,
  decreasePrice,
  initialCount,
}: ICartItemCounterProps) => {
  const [spinner, setPinner] = React.useState(false)
  const [count, setCount] = React.useState(initialCount)
  const [disableIncrease, setDisableIncrease] = React.useState(false)
  const [disableDecrease, setDisableDecrease] = React.useState(false)

  React.useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    }

    if (count === totalCount) {
      setDisableIncrease(true)
    }
  }, [count, totalCount])

  // получаю длступ к стору
  const mode = useStore($mode)

  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const decrease = async () => {
    try {
      setPinner(true)
      decreasePrice()
      setDisableIncrease(false)
      setCount(count - 1)

      const data = await updateCartItem({
        url: `/shopping-cart/count/${partId}`,
        payload: { count: count - 1 },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setPinner(false)
    }
  }

  const increase = async () => {
    try {
      setPinner(true)
      increasePrice()
      setDisableDecrease(false)
      setCount(count + 1)

      const data = await updateCartItem({
        url: `/shopping-cart/count/${partId}`,
        payload: { count: count + 1 },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setPinner(false)
    }
  }

  return (
    <div
      className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
    >
      <button disabled={disableDecrease} onClick={decrease}>
        <MinusSvg />
      </button>
      <span>
        {spinner ? (
          <span
            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button disabled={disableIncrease} onClick={increase}>
        <PlusSvg />
      </button>
    </div>
  )
}

export default CartItemCounter
