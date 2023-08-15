import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

import styles from './CartPopup.module.scss'
import { IWrappedComponentProps } from '@/types/common'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import { IShoppingCartItem } from '@/types/shopping-cart'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    //ig
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mode = useSelector((state: any) => state.theme)
    const shoppingCart = useSelector((state: IShoppingCartItem) => state.cart)
    // делаю условие по теме и применю стили
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleCartDropDown = () => setOpen(!open)

    return (
      <div className={styles.cart} ref={ref}>
        <button
          className={`${styles.cart__btn} ${darkModeClass}`}
          style={{ cursor: 'auto' }}
          onClick={toggleCartDropDown}
        >
          {!!shoppingCart.length && (
            <span className={styles.cart__btn__count}>
              {shoppingCart.length}
            </span>
          )}
          <span className={styles.cart__svg}>
            <ShoppingCartSvg />
          </span>
          <span className={styles.cart__text}>Корзина</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {/* // Нужно будет перебирать массив с состоянием товара */}
                {shoppingCart.length ? (
                  shoppingCart.map((item) => <li key={item.id} />)
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Корозина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                  >
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>0 P</span>
                </div>
                <Link href="/order" passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
CartPopup.displayName = 'CartPopup'
export default withClickOutside(CartPopup)
