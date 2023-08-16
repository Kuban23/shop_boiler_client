import Head from 'next/head'

import Header from '@/components/modules/Header/Header'

const Dashboard = () => {
  console.log()
  return (
    <>
      <Head>
        <title>Магазин котлов</title>
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
      <Header />
      <main>
        <div className="overlay" />
        <h1>Dashboard</h1>
      </main>
    </>
  )
}

export default Dashboard
