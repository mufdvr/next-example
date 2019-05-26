import * as React from 'react'
import { Provider, ProviderProps } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import makeStore from 'store'

class MyApp extends App<ProviderProps> {
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

export default withRedux(makeStore)(MyApp)
