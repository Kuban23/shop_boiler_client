/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useStore } from 'effector-react'

import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const [skeleton] = React.useState(false)
  // const [spinner, setSpinner] = React.useState(false)
  const mode = useStore($mode)
  const user = useStore($user)
  //Состояние элементов корзины
  const shoppingCart = useStore($shoppingCart)

  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <img src={JSON.parse(item.images)[0]} alt={item.name} />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${
          isInCart ? styles.added : ''
        }`}
        disabled={skeleton}
        onClick={toggleToCart}
      >
        {skeleton ? (
          <div className={skeletonStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
