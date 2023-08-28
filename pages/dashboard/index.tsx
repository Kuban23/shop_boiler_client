import Head from 'next/head'

import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
//import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

const Dashboard = () => {
  // const { shouldLoadContent } = useRedirectByUserCheck()
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
      {/* {shouldLoadContent && (
        <Layout>
          <main>
            <div className="overlay" />
            <DashboardPage />
          </main>
        </Layout>
      )} */}
      <Layout>
        <main>
          <div className="overlay" />
          <DashboardPage />
        </main>
      </Layout>
    </>
  )
}

export default Dashboard
