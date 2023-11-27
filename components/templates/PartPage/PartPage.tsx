import React from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

import styles from './partPage.module.scss'
import { $boilerPart } from '@/context/boilerPart'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import { removeFromCart } from '@/context/api/shopping-cart'
import spinnerStyles from '../../modules/AuthPage/spinner/index.module.scss'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'

const PartPage = () => {
  const mode = useStore($mode)
  const boilerPart = useStore($boilerPart)
  const user = useStore($user)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const cartItems = useStore($shoppingCart)
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id)
  const spinnerToggleCart = useStore(removeFromCart.pending)
  const isMobile = useMediaQuery(850)

  const toggleToCart = () =>
    toggleCartItem(user.username, boilerPart.id, isInCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {boilerPart.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.price || 0)} P
              </span>

              <span className={styles.part__info__stock}>
                {boilerPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>

              <span className={styles.part__info__code}>
                Артикул: {boilerPart.vendor_code}
              </span>

              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>

              {isMobile && <PartTabs />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartPage
