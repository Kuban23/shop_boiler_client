/* eslint-disable max-len */
import { IBrandsSliderArrow } from '@/types/elements'

import styles from '../../../components/templates/DashboardPage/dashboardPage.module.scss'
import BrandSliderArrowSvg from '../BrandsSliderArrow/BrandsSliderArrowSvg'

const BrandsSliderPrevArrow = (props: IBrandsSliderArrow) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
)

export default BrandsSliderPrevArrow
