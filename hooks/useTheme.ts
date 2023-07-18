import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setMode } from '../redux/slices/modeTheme'

export const useTheme = () => {
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'))
      dispatch(setMode('light'))
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'))
      dispatch(setMode('dark'))
    }
  }

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('mode') as string)

    if (localTheme) {
      dispatch(setMode(localTheme))
    }
  }, [])

  return { toggleTheme }
}
