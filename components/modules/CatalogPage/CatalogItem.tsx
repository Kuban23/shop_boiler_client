/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import styles from '../../templates/CatalogPage/catalogPage.module.scss'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const [skeleton, setSkeleton] = React.useState(false)
  //Состояние элементов корзины
  const shoppingCart = useSelector((state: any) => state.cart)
  console.log(shoppingCart)

  // const isInCart = shoppingCart.some(
  //   (cartItem: any) => cartItem.partId === item.id
  // )

  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

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
        <button
          className={`${styles.catalog__list__item__cart}
          }`}
          disabled={skeleton}
        >
          {skeleton ? (
            <div
              className={skeletonStyles.spinner}
              style={{ top: 6, left: 6 }}
            />
          ) : (
            <span>
              <CartHoverSvg />
            </span>
          )}
        </button>
      </div>
    </li>
  )
}

export default CatalogItem
