import React from 'react'

import styles from './dashboardPage.module.scss'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
// import { IBoilerParts } from '@/types/boilerparts'
import { useSelector } from 'react-redux'
import { getBestsellersParts } from '@/redux/slices/bestsellersBoilerParts'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { IBoilerParts } from '@/types/boilerparts'
import { getNewParts } from '@/redux/slices/newBoilerParts'
import { useAppDispatch } from '@/redux/store'

const DashboardPage = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  // Состояние новинок и бестселлеров получаю с сервера
  // const [newParts, setNewParts] = React.useState<IBoilerPart[]>([])
  // const [bestsellers, setBestsellers] = React.useState<IBoilerPart[]>([])

  const [skeleton, setSkeleton] = React.useState(false)

  React.useEffect(() => {
    loadBoilerParts()
  }, [])

  const bestsellersParts = useSelector(
    (state: IBoilerParts) => state.bestsellers.items
  )

  const newParts = useSelector((state: IBoilerParts) => state.newParts.items)

  const dispatch = useAppDispatch()
  // const dispatch = useDispatch()

  const loadBoilerParts = async () => {
    try {
      setSkeleton(true)
      dispatch(getBestsellersParts())
      dispatch(getNewParts())
      // const bestsellers = await getBestsellersOrNewPartsFx(
      //   '/boiler-parts/bestsellers'
      // )
      // const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

      // setBestsellers(bestsellers)
      // setNewParts(newParts)
    } catch (error) {
      // toast.error((error as Error).message)
    } finally {
      setSkeleton(false)
    }
  }

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
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
          <DashboardSlider
            items={bestsellersParts.rows || []}
            skeleton={skeleton}
          />
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
