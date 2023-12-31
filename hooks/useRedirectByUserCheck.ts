import React from 'react'

import { useRouter } from 'next/router'
import { checkUserAuth } from '@/context/api/auth'
import { setUser } from '@/context/user'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = React.useState(false)
  const router = useRouter()
  const shouldCheckAuth = React.useRef(true)

  React.useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuth('/users/login-check')
    console.log(user)
    //проверка- если нахожусь на странице регистрации/логина
    if (isAuthPage) {
      //если не юзер-если вернулся falce-пользователь не залогинен
      if (!user) {
        //то делаю setShouldLoadContent(true)-т.е. убедился, что пользователь не залогинен и показываю
        //для него страницу регистрации и логина
        setShouldLoadContent(true)
        return
      }
      // иначе делаю редирект на страницу dashboard
      router.push('/dashboard')
      return
    }
    //если юзер есть-если вернулся true-пользователь залогинен
    if (user) {
      setUser(user)
      setShouldLoadContent(true)
      return
    }
    //если юзера не будет и он не будет на странице регистрации/логина, то делаю router.push('/')
    router.push('/')
  }
  // возвращаю переменную
  return { shouldLoadContent }
}

export default useRedirectByUserCheck
