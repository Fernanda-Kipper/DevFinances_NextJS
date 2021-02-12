import React, { useContext  } from 'react'

import {Utilitys} from '../services/Utilitys'

import ThemeContext from '../contexts/ThemeContext'
import TransactionsContext from '../contexts/Transactions'

import minusImg from '../../assets/minus.svg'
import styles from '../styles/components/Table.module.css'

export default function Table(){
    const { isDark } = useContext(ThemeContext)
    const {transactions, setTransactions} = useContext(TransactionsContext)

    return(
    <table className={styles.table}>
        <thead>
          <tr className={styles.tableTr}>
            <th className={isDark? styles.tableHeaderDark : styles.tableHeader}>Descrição</th>
            <th className={isDark? styles.tableHeaderDark : styles.tableHeader}>Tag</th>
            <th className={isDark? styles.tableHeaderDark : styles.tableHeader}>Data</th>
            <th className={isDark? styles.tableHeaderDark : styles.tableHeader}>Valor</th>
            <th className={isDark? styles.tableHeaderDark : styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction,index) => (
            <tr className={styles.tableTr} key={index}>
              <td className={isDark? styles.tableTdDark : styles.tableTd}>{transaction.description}</td>
              <td className={isDark? styles.tableTdDark : styles.tableTd}>{transaction.tag}</td>
              <td className={isDark? styles.tableTdDark : styles.tableTd}>{transaction.date}</td>
              <td
              className={
                transaction.amount > 0 ? 
              (isDark? styles.tableTdIncomeDark : styles.tableTdIncome) 
              :(isDark? styles.tableTdExpenseDark : styles.tableTdExpense)}>
                {Utilitys.formatCurrency(transaction.amount)}
              </td>
              <td className={isDark? styles.tableTdDark : styles.tableTd}>  
                <img 
                src={minusImg}
                alt="Imagem indicando retirar transação"
                onClick={()=>{
                  localStorage.setItem('transactions', JSON.stringify(transactions.filter((obj, i) => i !== index)))
                  setTransactions(currentState => currentState.filter((obj, i) => i !== index))
                }}
                />
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    )
}