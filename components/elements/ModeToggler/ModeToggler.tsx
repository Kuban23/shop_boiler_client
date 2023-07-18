import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '../../../hooks/useTheme'
import styles from './index.module.scss'

const ModeToggler = () => {
  const { toggleTheme } = useTheme()
  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mode = useSelector((state: any) => state.theme)

  const handleToggleMode = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
  }, [mode])

  return (
    <div className={styles.theme}>
      <input
        className={styles.theme__input}
        type="checkbox"
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  )
}

export default ModeToggler
