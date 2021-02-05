import { useState, useCallback, useEffect } from 'react'
import {Utilitys} from '../services/Utilitys'

import moneyImg from '../assets/money.svg'
import copyLeftImg from '../assets/copyLeft.svg'
import minusImg from '../assets/minus.svg'
import expenseImg from '../assets/expense.svg'
import incomeImg from '../assets/income.svg'
import totalImg from '../assets/total.svg'

import styles from '../styles/Home.module.css'
import darkStyles from '../styles/DarkHome.module.css'

export default function Home() {
  const [modalIsActive, setModalActive] = useState(false)
  const [isDark, setDark] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")

  useEffect(()=>{
    setTransactions(JSON.parse(localStorage.getItem('transactions')) || [])
    setDark(JSON.parse(localStorage.getItem('darkTheme')) || false)
  },[])

  const modalClassname = useCallback(() =>{
    if(modalIsActive){
      return styles.active
    }
    else{
      return styles.nonactive
    }
  }, [modalIsActive])

  function handleOpenModal(){
    if(modalIsActive){
      setModalActive(false)
    }
    else{
      setModalActive(true)
    }
  }

  function handleDarkActive(){
    if(isDark){
      setDark(false)
      localStorage.setItem('darkTheme', JSON.stringify(false))
    }
    else{
      setDark(true)
      localStorage.setItem('darkTheme', JSON.stringify(true))
    }
  }

  const Transactions = {

    formatValues(){
      const formatedAmount = Utilitys.formatAmount(amount)
      const formatedDate = Utilitys.formatDate(date)
      return {amount: formatedAmount, description: description, date: formatedDate}
    },

    saveTransaction(){
      localStorage.setItem('transactions', JSON.stringify(transactions))
    },

    clearFields(){
      setAmount(0)
      setDescription('')
      setDate('')
    },

    add(formdata){
      let newTransactions = transactions
      newTransactions.push(formdata)
      setTransactions(newTransactions)
    },

    expenses(){
      let expenses = 0
      transactions.forEach(transaction => {
        if (transaction.amount < 0){
          expenses += transaction.amount
        }
      })

      return expenses
    },
    incomes(){
      let incomes = 0
      transactions.forEach(transaction => {
        if (transaction.amount > 0){
          incomes += transaction.amount
        }
      })

      return incomes
    },

    total(){
      return this.incomes() + this.expenses()
    },

    submit(event){
      event.preventDefault()

      const formdata = Transactions.formatValues()

      // updating the current state of transactions at the application
      Transactions.add(formdata)

      // saving to local storage
      Transactions.saveTransaction()

      setModalActive(false)

      Transactions.clearFields()
    },
  }

  return (
    <div className={isDark ? darkStyles.body : styles.body}>
      <header className={isDark? darkStyles.header : styles.header}>
      <label className={styles.switchButton}>
        <input className={styles.switchInput} type="checkbox" onChange={handleDarkActive}/>
        <span className={styles.slide}></span>
      </label>
        <h1 className={styles.title}>Dev Finances</h1>
        <img src={moneyImg} width="50" height="50" alt="Logo"/>
      </header>
      <main className={styles.main}>
        <section className={styles.cardSection}>
          <h2 className={styles.subtitleHidden}>Balanço</h2>
          <div className={isDark? darkStyles.card : styles.card}>
          <h3 className={styles.subsubtitle}>
              <span>Entrada</span>
              <img src={incomeImg} alt="Image de entradas"/>
            </h3>
            <p className={styles.income}>{Utilitys.formatCurrency(Transactions.incomes())}</p>
          </div>
          <div className={isDark? darkStyles.card : styles.card}>
            <h3 className={styles.subsubtitle}>
              <span>Saídas</span>
              <img src={expenseImg} alt="Image de saídas"/>
            </h3>
            <p className={styles.expense}>{Utilitys.formatCurrency(Transactions.expenses())}</p>
          </div>
          <div className={Transactions.total() >= 0 ? styles.totalCardPositive : styles.totalCardNegative}>
          <h3 className={styles.totalSubsubtitle}>
              <span>Total</span>
              <img src={totalImg} alt="Image de total"/>
            </h3>
            <p className={styles.total}>{Utilitys.formatCurrency(Transactions.total())}</p>
          </div>
        </section>
        <section className={styles.tableSection}>
          <h2 className={styles.subtitleHidden}>Gastos Específicos</h2>
          <a
            href="#"
            onClick={handleOpenModal}
            className={styles.button}>
              + Nova Transação
          </a>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableTr}>
                <th className={isDark? darkStyles.tableHeader : styles.tableHeader}>Tipo de gasto</th>
                <th className={isDark? darkStyles.tableHeader : styles.tableHeader}>Data</th>
                <th className={isDark? darkStyles.tableHeader : styles.tableHeader}>Valor</th>
                <th className={isDark? darkStyles.tableHeader : styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction,index) => (
                <tr className={styles.tableTr} key={index}>
                  <td className={isDark? darkStyles.tableTd : styles.tableTd}>{transaction.description}</td>
                  <td className={isDark? darkStyles.tableTd : styles.tableTd}>{transaction.date}</td>
                  <td 
                  className={
                    transaction.amount > 0 ? 
                  (isDark? darkStyles.tableTdIncome : styles.tableTdIncome) 
                  :(isDark? darkStyles.tableTdExpense : styles.tableTdExpense)}>
                    {Utilitys.formatCurrency(transaction.amount)}
                  </td>
                  <td className={isDark? darkStyles.tableTd : styles.tableTd}>  
                    <img 
                    src={minusImg} 
                    alt="Imagem indicando retirar transação"
                    onClick={()=>{
                      // firts remove from localStorage because after changing the State the page will be re-rendered
                      localStorage.setItem('transactions',JSON.stringify(transactions.filter((obj, i) => i !== index)))

                      // sets the new state
                      setTransactions(currentState => currentState.filter((obj, i) => i !== index))
                    }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className={modalClassname()}>
              <div className={isDark? darkStyles.modal : styles.modal}>
                  <div className={styles.form}>
                      <h2 className={styles.subtitle}>Nova Transação</h2>
                      <form onSubmit={Transactions.submit}>
                          <div className={styles.input_group}>
                              <label 
                                  className={styles.subtitleHidden}
                                  htmlFor="description">Descrição</label>
                              <input 
                                  type="text" 
                                  id="description" 
                                  name="description"
                                  placeholder="Descrição"
                                  className={styles.input}
                                  onChange={e => setDescription(e.target.value)}
                                  value={description}
                                  required
                              />
                          </div>

                          <div className={styles.input_group}>
                              <label 
                                  className={styles.subtitleHidden}
                                  htmlFor="amount">Valor</label>
                              <input
                                  type="number"
                                  step="0.01"
                                  id="amount" 
                                  name="amount"
                                  placeholder="0,00"
                                  className={styles.input}
                                  onChange={e => setAmount(e.target.value)}
                                  value={amount}
                                  required
                              />
                              <small className={styles.help}>Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais</small>
                          </div>

                          <div className={styles.input_group}>
                              <label 
                                  className={styles.subtitleHidden} 
                                  htmlFor="date">Data</label>
                              <input 
                                  type="date" 
                                  id="date" 
                                  name="date"
                                  className={styles.input}
                                  onChange={e => setDate(e.target.value)}
                                  value={date}
                                  required
                              />
                          </div>

                          <div className={styles.actionsForm}>
                              <a 
                              onClick={handleOpenModal}
                              href="#"
                              className={isDark? darkStyles.buttonCancel : styles.buttonCancel}>Cancelar</a>
                              <button className={styles.buttonSave}>Salvar</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </main>
      <footer className={styles.footer}>
        <img src={copyLeftImg} alt="Copyleft" width="25" height="25"/>
        <h2 className={isDark? darkStyles.footerTitle : styles.footerTitle}>Dev Finance$</h2>
      </footer>
    </div>
  )
}