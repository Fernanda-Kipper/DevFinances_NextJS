import React, { useContext, useEffect, useState  } from 'react'

import {Utilitys} from '../services/Utilitys'

import ThemeContext from '../contexts/ThemeContext'
import TransactionsContext from '../contexts/Transactions'

import styles from '../styles/components/PercentageBar.module.css'

export default function TableTags({ totalExpenses, registeredTags }){
    const { isDark } = useContext(ThemeContext)
    const { transactions } = useContext(TransactionsContext)
    const [tags, setTags] = useState([])

    useEffect(()=>{
        setTags(JSON.parse(localStorage.getItem('tags')) || [])
    }, [])

    useEffect(()=>{
        setTags(JSON.parse(localStorage.getItem('tags')))
      },[registeredTags])

    function handleSameTagTrasactions(tag){
        let sameTagTransactions = transactions.filter((transaction)=> {return  transaction.tag === tag})
        let result = sameTagTransactions.reduce((amount, newValue) => {
            return amount + newValue.amount
        }, 0)
        return result
    }

    return(
        <div className={isDark? styles.barDark : styles.bar}>
            {tags.map(function(tag){
                const value = handleSameTagTrasactions(tag)
                if (value !== 0){
                    return(
                        <div className={styles.barFraction} style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, width: `${value * 100 /(totalExpenses / 100)}%`}}>
                            <span className={styles.value}>{Utilitys.formatCurrency(value)}</span>
                            <span className={styles.value}>{tag}</span>
                        </div>
                    )
                }
            })}
        </div>
    )
}