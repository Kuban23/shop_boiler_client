import React, { MutableRefObject, useRef } from 'react'
import { useStore } from 'effector-react'
import Select from 'react-select'

import { SelectOptionType } from '@/types/common'
import { inputStyles, controlStyles, menuStyles, optionStyles } from '.'
import { $mode } from '@/context/mode'
import { toggleClassNamesForOverlayAndBody } from '@/utils/common'
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header'
import SearchSvg from '../../SearchSvg/SearchSvg'
import styles from '../../../modules/Header/header.module.scss'

const SearchInput = () => {
  const zIndex = useStore($searchInputZIndex)
  const mode = useStore($mode)

  // делаю условие по теме и применю стили
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // состояние выподающего списка инпута-поиска
  const [searchOption, setSearchOption] = React.useState<SelectOptionType>(null)
  // состояние опций выпадающего списка
  const [options, setOptions] = React.useState(
    [1, 2, 3, 4, 5].map((item) => ({ value: item, label: item }))
  )

  const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = React.useState(
    {}
  )
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] =
    React.useState({})

  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
  const borderRef = useRef() as MutableRefObject<HTMLSpanElement>

  // функция которя будет сетить каждую опцию
  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
      return
    }
  }

  const onFocusSearch = () => {
    toggleClassNamesForOverlayAndBody('open-search')
    setSearchInputZIndex(100)
  }

  const onSearchInputChange = () => {
    document.querySelector('.overlay')?.classList.add('open-search')
    document.querySelector('.body')?.classList.add('overflow-hidden')
  }

  const onSearchMenuOpen = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 0,
      border: 'none',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    })

    btnRef.current.style.border = 'none'
    btnRef.current.style.borderBottomRightRadius = '0'
    borderRef.current.style.display = 'block'
  }

  const onSearchMenuClose = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 4,
      boxShadow: 'none',
      border: '1px solid #9e9e9e',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: 'none',
    })

    btnRef.current.style.border = '1px solid #9e9e9e'
    btnRef.current.style.borderLeft = 'none'
    btnRef.current.style.borderBottomRightRadius = '4px'
    borderRef.current.style.display = 'none'
  }

  return (
    <>
      <div className={styles.header__search__inner}>
        <Select
          placeholder="Я ищу..."
          value={searchOption}
          onChange={handleSearchOptionChange}
          styles={{
            container: (defaultStyles) => ({
              ...defaultStyles,
              ...onMenuOpenContainerStyles,
            }),
            ...inputStyles,
            control: (defaultStyles) => ({
              ...controlStyles(defaultStyles, mode),
              zIndex,
              transition: 'none',
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
              ...onMenuOpenControlStyles,
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222',
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              zIndex,
              marginTop: '-1px',
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode),
            }),
          }}
          options={options}
          isClearable={true}
          openMenuOnClick={false}
          onFocus={onFocusSearch}
          onInputChange={onSearchInputChange}
          onMenuOpen={onSearchMenuOpen}
          onMenuClose={onSearchMenuClose}
        />
        <span ref={borderRef} className={styles.header__search__border} />
      </div>
      <button
        className={`${styles.header__searcht__btn} ${darkModeClass}`}
        ref={btnRef}
        style={{ zIndex }}
      >
        <span className={styles.header__searcht__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  )
}

export default SearchInput
