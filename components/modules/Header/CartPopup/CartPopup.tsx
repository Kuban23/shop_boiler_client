import React, { forwardRef } from 'react'
//import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from 'effector-react'

import styles from './CartPopup.module.scss'
import { IWrappedComponentProps } from '@/types/common'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
//import { IShoppingCartItem } from '@/types/shopping-cart'
import { $mode } from '@/context/mode'
import { $shoppingCart, setShoppingCart } from '@/context/shopping-cart'
import CartPopupItem from './CartPopupItem'
import { toast } from 'react-toastify'
import { getCartItems } from '@/context/api/shopping-cart'
import { $user } from '@/context/user'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    // получаю длступ к стору
    const mode = useStore($mode)
    const user = useStore($user)
    const shoppingCart = useStore($shoppingCart)
    // делаю условие по теме и применю стили
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    //const shoppingCart = useSelector((state: IShoppingCartItem) => state.cart)

    const toggleCartDropDown = () => setOpen(!open)

    React.useEffect(() => {
      loadCartItems()
    }, [])

    const loadCartItems = async () => {
      try {
        const cartItems = await getCartItems(`/shopping-cart/${user.userId}`)

        setShoppingCart(cartItems)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

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
                  shoppingCart.map((item) => (
                    <CartPopupItem key={item.id} item={item} />
                  ))
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
