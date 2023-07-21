import React from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'

import { SelectOptionType } from '@/types/common'
import { inputStyles, controlStyles, menuStyles, optionStyles } from '.'

const SearchInput = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)

  // состояние выподающего списка инпута-поиска
  const [searchOption, setSearchOption] = React.useState<SelectOptionType>(null)
  // состояние опций выпадающего списка
  const [options, setOptions] = React.useState(
    [1, 2, 3, 4, 5].map((item) => ({ value: item, label: item }))
  )

  // функция которя будет сетить каждую опцию
  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
      return
    }
  }
  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      options={options}
      isClearable={true}
      openMenuOnClick={false}
    />
  )
}

export default SearchInput
