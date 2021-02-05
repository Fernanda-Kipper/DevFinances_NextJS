import { useEffect, useState } from 'react'
import ThemeContext from '../src/ThemeContext/ThemeContext'

import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isDark, setDarkTheme] = useState(false)

  useEffect(()=>{
    setDarkTheme(JSON.parse(localStorage.getItem('darkTheme')) || false)
    console.log(isDark)
  },[])

  return (
    <ThemeContext.Provider value={{isDark, setDarkTheme}}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  )
}

export default MyApp
