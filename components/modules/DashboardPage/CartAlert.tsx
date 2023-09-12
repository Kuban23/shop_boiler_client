import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { ICartAlertProps } from '@/types/dashboard'
import styles from '../../templates/DashboardPage/dashboardPage.module.scss'
import { formatPrice } from '@/utils/common'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // Функция для корректного отображения слова ТОВАР
  const showCountMessage = (count: string) => {
    if (count.endsWith('1')) {
      return 'товар'
    }
    if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
      return 'товара'
    }
    return 'товаров'
  }

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>
          В корзине {count} {showCountMessage(`${count}`)}
        </span>
        <span>На сумму {formatPrice(0)} P</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
        </Link>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}

export default CartAlert