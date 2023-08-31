import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'

function Catalog() {
  return (
    <>
      <Head>
        <title>Аква Тепмикс</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <Layout>
        <main>
          <CatalogPage />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default Catalog
