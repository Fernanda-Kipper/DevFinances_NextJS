import { useEffect, useState } from 'react'
import Head from 'next/head'

import ThemeContext from '../src/contexts/ThemeContext'
import TransactionsContext from '../src/contexts/Transactions'

import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isDark, setDarkTheme] = useState(false)
  const [transactions, setTransactions] = useState([])

  useEffect(()=>{
    setDarkTheme(JSON.parse(localStorage.getItem('darkTheme')) || false)
    setTransactions(JSON.parse(localStorage.getItem('transactions')) || [])
  },[])

  return (
    <ThemeContext.Provider value={{isDark, setDarkTheme}}>
      <TransactionsContext.Provider value={{transactions, setTransactions}}>
        <Head>
          <link rel="icon" href="../assets/money.svg"/>
          <title>DevFinances</title>
        </Head>
        <Component {...pageProps} />
      </TransactionsContext.Provider>
    </ThemeContext.Provider>
  )
}

export default MyApp
