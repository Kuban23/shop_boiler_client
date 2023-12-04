import React from 'react'
import Head from 'next/head'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'
import { IQueryParams } from '@/types/catalog'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import { getBoilerPart } from '@/context/api/boilerParts'
import PartPage from '@/components/templates/PartPage/PartPage'
import Custom404 from './404'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const router = useRouter()
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPart(`/boiler-parts/find/${query.partId}`)

      if (!data) {
        setError(true)
        return
      }

      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Мир котлов | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogPartPage
