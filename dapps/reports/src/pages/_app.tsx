import { CacheProvider, EmotionCache } from '@emotion/react'
import Layout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { FilterProvider } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import { TITLE } from '@karpatkey-monorepo/shared/config/constants'
import createEmotionCache from '@karpatkey-monorepo/shared/config/createEmotionCache'
import theme from '@karpatkey-monorepo/shared/config/theme'
import { CssBaseline, NoSsr } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()
  const isPasswordProtected = router.asPath.includes('/password-protect')

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{TITLE}</title>
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <ErrorBoundaryWrapper>
            <FilterProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <NoSsr>
                {isPasswordProtected ? <Component {...pageProps} /> : null}
                {!isPasswordProtected ? (
                  <Layout {...pageProps}>
                    <Component {...pageProps}/>
                  </Layout>
                ) : null}
              </NoSsr>
            </FilterProvider>
          </ErrorBoundaryWrapper>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  )
}
