import React from 'react'

import styles from './dashboardPage.module.scss'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'

const DashboardPage = () => {
  console.log()
  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
