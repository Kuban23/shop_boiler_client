import { addToCart, removeFromCart } from '@/context/api/shopping-cart'
import {
  removeShoppingCartItem,
  updateShoppingCart,
} from '@/context/shopping-cart'
import { toast } from 'react-toastify'

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean
  //  setSpinner: (arg: boolean) => void
) => {
  try {
    // setSpinner(true)
    if (isInCart) {
      await removeFromCart(`/shopping-cart/one/${partId}`)
      removeShoppingCartItem(partId)
      return
    }

    const data = await addToCart({
      url: '/shopping-cart/add',
      username,
      partId,
    })
    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    // setSpinner(false)
  }
}
