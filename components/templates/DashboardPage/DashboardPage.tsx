import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import styles from './dashboardPage.module.scss'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { IBoilerParts } from '@/types/boilerparts'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import { $mode } from '@/context/mode'
import { getBestsellersOrNewParts } from '@/context/api/boilerParts'
import { $shoppingCart } from '@/context/shopping-cart'

const DashboardPage = () => {
  //Состояние элементов корзины
  const shoppingCart = useStore($shoppingCart)

  // Состояние при котором будет показываться алерт корзины
  const [showAlert, setShowAlert] = React.useState(!!shoppingCart.length)

  const mode = useStore($mode)

  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // Состояние новинок и бестселлеров получаю с сервера
  const [newParts, setNewParts] = React.useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [bestsellers, setBestsellers] = React.useState<IBoilerParts>(
    {} as IBoilerParts
  )

  const [skeleton, setSkeleton] = React.useState(false)

  React.useEffect(() => {
    loadBoilerParts()
  }, [])

  // запрашиваю товар на сервере
  const loadBoilerParts = async () => {
    try {
      setSkeleton(true)
      const newParts = await getBestsellersOrNewParts('/boiler-parts/new')
      const bestsellers = await getBestsellersOrNewParts(
        '/boiler-parts/bestsellers'
      )
      setNewParts(newParts)
      setBestsellers(bestsellers)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSkeleton(false)
    }
  }

  // Функция которую буду передавать в CartAlert
  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для газовых котлов
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} skeleton={skeleton} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} skeleton={skeleton} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить
            неисправность и правильно выбрать запчасть для ремонта Вашего
            газового оборудования. Купить запчасть, деталь для ремонта газового
            котла возможно в любом населенном пункте Российской Федерации:
            Осуществляем доставку запчасти к газовым котлам в следующие города:
            Москва, Санкт-Петербуг, Краснодар, Екатеринбург, Новосибирск,
            Воронеж.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
