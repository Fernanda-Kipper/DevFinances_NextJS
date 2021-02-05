import React,{ useContext } from 'react'

import styles from '../styles/components/Card.module.css'
import {Utilitys} from '../services/Utilitys'
import ThemeContext from '../ThemeContext/ThemeContext'

export default function Card({ Transactions, Img, type, classname }){
    const { isDark } = useContext(ThemeContext)
    return(
       <div className=
       {classname ? ( classname === 'negative' ? styles.totalCardNegative : styles.totalCardPositive)
        : (isDark? styles.cardDark : styles.card)}>
        <h3 className={styles.subsubtitle}>
          <span>{type}</span>
          <img src={Img} alt={`Imagem de ${type}`}/>
        </h3>
        <p
            className=
            {type === "Entrada" ? styles.income
            :type === "Saída" ? styles.expense : styles.total}>
                {Utilitys.formatCurrency(Transactions.incomes())}
        </p>
      </div>
    )
}