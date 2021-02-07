import React,{ useContext, useState } from 'react'

import ThemeContext from '../contexts/ThemeContext'

import styles from '../styles/components/Card.module.css'

export default function Card({ Img, type, classname, value }){
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
              {value}
        </p>
      </div>
    )
}