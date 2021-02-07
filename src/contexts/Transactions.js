import { createContext } from 'react'

const TransactionsContext = createContext({
    transactions: [],
    setTransactions: ()=>{}
})

export default TransactionsContext;