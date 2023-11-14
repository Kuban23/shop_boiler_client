import React from 'react'
import { useStore } from 'effector-react'
import Link from 'next/link'

import { IShoppingCartItem } from '@/types/shopping-cart'
import { $mode } from '@/context/mode'
import styles from './CartPopup.module.scss'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { removeItemFromCart } from '@/utils/shopping-cart'
import { updateTotalPrice } from '@/utils/catalog'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const [spinner, setSpinner] = React.useState(false)
  const [price, setPrice] = React.useState(item.price)
  // получаю длступ к стору
  const mode = useStore($mode)

  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${skeletonStyles.dark_mode}`

  const deleteCartItem = () => removeItemFromCart(item.partId, setSpinner)

  const increasePrice = () => setPrice(price + item.price)

  const decreasePrice = () => setPrice(price - item.price)

  React.useEffect(() => {
    setPrice(price * item.count)
  }, [])

  React.useEffect(() => {
    updateTotalPrice(price, item.partId)
  }, [price])

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
              {item.boiler_manufacturer}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${skeletonStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>

      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Нет на складе
          </span>
        ) : (
          <div />
        )}
        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          P
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
