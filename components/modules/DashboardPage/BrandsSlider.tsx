import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from '../../templates/DashboardPage/dashboardPage.module.scss'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'

const BrandsSlider = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const isMedia768 = useMediaQuery(768)

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    variableWidth: true,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  //Массив брендов
  const brandItems = [
    { id: 1, img: '/images/brand-1.png', alt: 'brand-1' },
    { id: 2, img: '/images/brand-2.svg', alt: 'brand-2' },
    { id: 3, img: '/images/brand-3.png', alt: 'brand-3' },
    { id: 4, img: '/images/brand-4.png', alt: 'brand-4' },
    { id: 5, img: '/images/brand-1.png', alt: 'brand-1' },
    { id: 6, img: '/images/brand-2.svg', alt: 'brand-2' },
    { id: 7, img: '/images/brand-3.png', alt: 'brand-3' },
    { id: 8, img: '/images/brand-4.png', alt: 'brand-4' },
    { id: 9, img: '/images/brand-1.png', alt: 'brand-1' },
    { id: 10, img: '/images/brand-2.svg', alt: 'brand-2' },
    { id: 11, img: '/images/brand-3.png', alt: 'brand-3' },
    { id: 12, img: '/images/brand-4.png', alt: 'brand-4' },
  ]

  return (
    <Slider {...settings}>
      {brandItems.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={item.id}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
