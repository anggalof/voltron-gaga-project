import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import '../styles/globals.css'


export type NextPageWithLayout = NextPage & {
  noLayout: Boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
