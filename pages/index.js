import { useState, useEffect, useContext } from 'react'

import {Utilitys} from '../src/services/Utilitys'
import MainButton from '../src/components/MainButton'
import Modal from '../src/components/Modal'
import Card from '../src/components/Card'

import ThemeContext from '../src/ThemeContext/ThemeContext'

import moneyImg from '../assets/money.svg'
import copyLeftImg from '../assets/copyLeft.svg'
import minusImg from '../assets/minus.svg'
import expenseImg from '../assets/expense.svg'
import incomeImg from '../assets/income.svg'
import totalImg from '../assets/total.svg'

import styles from '../src/styles/pages/Home.module.css'
import darkStyles from '../src/styles/pages/DarkHome.module.css'

export default function Home() {
  const {isDark, setDarkTheme} = useContext(ThemeContext)

  const [modalFormIsActive, setModalFormActive] = useState(false)
  const [modalDeleteIsActive, setModalDeleteActive] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")

  useEffect(()=>{
    setTransactions(JSON.parse(localStorage.getItem('transactions')) || [])
  },[])

  function handleOpenModalForm(){
    if(modalFormIsActive){
      setModalFormActive(false)
    }
    else{
      setModalFormActive(true)
    }
  }

  function handleOpenModalDelete(){
    if(modalDeleteIsActive){
      setModalDeleteActive(false)
    }
    else{
      setModalDeleteActive(true)
    }
  }

  function handleDarkActive(){
    if(isDark){
      setDarkTheme(false)
      localStorage.setItem('darkTheme', JSON.stringify(false))
    }
    else{
      setDarkTheme(true)
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
        <MainButton handleOpenModalForm={handleOpenModalForm} handleOpenModalDelete={handleOpenModalDelete}/>
        <section className={styles.cardSection}>
          <h2 className={styles.subtitleHidden}>Balanço</h2>
          <Card type="Entrada" Transactions={Transactions} Img={incomeImg}/>
          <Card type="Saída" Transactions={Transactions} Img={expenseImg}/>
          <Card type="Total" Transactions={Transactions} Img={totalImg} classname={Transactions.total() >= 0 ? 'positive' : 'negative'}></Card>
        </section>
        <section className={styles.tableSection}>
          <h2 className={styles.subtitleHidden}>Gastos Específicos</h2>
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
        <Modal modalIsActive={modalDeleteIsActive}>
          <h2 className={styles.subtitle}>Deseja deletar todas transações?</h2>
          <div className={styles.actionsForm}>
            <a 
              onClick={handleOpenModalDelete}
              href="#"
              className={isDark? darkStyles.buttonCancel : styles.buttonCancel}>
              Cancelar
            </a>
            <button className={styles.buttonSave}>Salvar</button>
          </div>
        </Modal>
        <Modal modalIsActive={modalFormIsActive}>
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
                      onClick={handleOpenModalForm}
                      href="#"
                      className={isDark? darkStyles.buttonCancel : styles.buttonCancel}>
                      Cancelar
                    </a>
                    <button className={styles.buttonSave}>Salvar</button>
                  </div>
              </form>
          </div>
        </Modal>
      </main>
      <footer className={styles.footer}>
        <img src={copyLeftImg} alt="Copyleft" width="25" height="25"/>
        <h2 className={isDark? darkStyles.footerTitle : styles.footerTitle}>Dev Finance$</h2>
      </footer>
    </div>
  )
}