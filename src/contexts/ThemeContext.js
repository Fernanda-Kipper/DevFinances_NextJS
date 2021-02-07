import { createContext } from 'react'

const ThemeContext = createContext({
    isDark: false,
    setDarkTheme: ()=>{}
})

export default ThemeContext;