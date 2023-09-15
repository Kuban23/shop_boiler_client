export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

// Функция для форматрования цены
export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// Функция для использования FilterSelect для сортировки товаров по цене (сначала дешевые)
export const createSelectOption = (value: string | number) => ({
  value,
  label: value,
})

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

// // Функция для клика по аватарке расположенной в hader
// export function withClickOutside(
//   WrappedComponent: ForwardRefExoticComponent<
//     IWrappedComponentProps & RefAttributes<HTMLDivElement>
//   >
// ) {
//   const Component = () => {
//     const [open, setOpen] = React.useState(false)
//     const ref = React.useRef() as MutableRefObject<HTMLDivElement>

//     React.useEffect(() => {
//       const handleClickOutside = (e: MouseEvent) => {
//         if (!ref.current.contains(e.target as HTMLDivElement)) {
//           setOpen(false)
//         }
//       }

//       document.addEventListener('mousedown', handleClickOutside)

//       return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [ref])

//     return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
//   }

//   return Component
// }
