/* eslint-disable indent */
import React from 'react'
import Select from 'react-select'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { controlStyles, menuStyles, selectStyles } from './select'
import { optionStyles } from '@/components/elements/Header/SearchInput'
import { categoriesOptions } from '@/utils/selectContents'
import { $mode } from '@/context/mode'
import {
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
} from '@/context/boilerParts'

const FilterSelect = () => {
  const mode = useStore($mode)
  const router = useRouter()
  // состояние выподающего списка инпута-поиска
  const [categoryOption, setCategoryOption] =
    React.useState<SelectOptionType>(null)
  // состояние опций выпадающего списка
  // const [options, setOptions] = React.useState(
  //   [1, 2, 3, 4, 5].map((item) => ({ value: item, label: item }))
  // )
  const boilerParts = useStore($boilerParts)

  // делаю так чтобы при перезагрузке сохранялся путь в адресной строке
  React.useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Сначала дешевые')
          setBoilerPartsCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Сначала дорогие')
          setBoilerPartsExpensiveFirst()
          break
        case 'popular':
          updateCategoryOption('По популярности')
          setBoilerPartsByPopularity()
          break
        default:
          updateCategoryOption('Сначала дешевые')
          setBoilerPartsCheapFirst()
          break
      }
    }
  }, [boilerParts.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  // функция поторая позволит сохранить выбранную сортировку товаров даже после обновления страницы
  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  // функция которая будет сетить каждую опцию
  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setCategoryOption(selectedOption)
    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевые':
        setBoilerPartsCheapFirst()
        updateRoteParam('cheap')
        break
      case 'Сначала дорогие':
        setBoilerPartsExpensiveFirst()
        updateRoteParam('expensive')
        break
      case 'По популярности':
        setBoilerPartsByPopularity()
        updateRoteParam('popular')
        break
    }
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешевые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
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
      options={categoriesOptions}
      isSearchable={false}
    />
  )
}

export default FilterSelect
