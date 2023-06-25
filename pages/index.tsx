import Head from 'next/head'

import AuthPage from '@/components/templates/AuthPage/AuthPage'

const Auth = () => {
  console.log()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/images/logo.svg"
        />
      </Head>
      <AuthPage />
    </>
  )
}

export default Auth
