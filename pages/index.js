import { useState, useEffect, useContext } from 'react'

import {Utilitys} from '../src/services/Utilitys'
import MainButton from '../src/components/MainButton'
import Modal from '../src/components/Modal'
import Card from '../src/components/Card'
import Table from '../src/components/Table'
import TagsPercentage from '../src/components/PercentageBar'

import ThemeContext from '../src/contexts/ThemeContext'
import TransactionsContext from '../src/contexts/Transactions'

import logoImg from '../assets/logo.svg'
import copyLeftImg from '../assets/Copyleft.svg'
import expenseImg from '../assets/expense.svg'
import incomeImg from '../assets/income.svg'
import totalImg from '../assets/total.svg'

import styles from '../src/styles/pages/Home.module.css'
import darkStyles from '../src/styles/pages/DarkHome.module.css'

export default function Home() {
  const {isDark, setDarkTheme} = useContext(ThemeContext)
  const {transactions, setTransactions} = useContext(TransactionsContext)

  const [modalFormIsActive, setModalFormActive] = useState(false)
  const [modalDeleteIsActive, setModalDeleteActive] = useState(false)
  const [modalTagsIsActive, setModalTagsActive] = useState(false)

  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [tag, setTag] = useState("")
  const [newTag, setNewTag] = useState("")
  const [registeredTags, setRegisteredTags] = useState([])

  useEffect(()=>{
    setRegisteredTags(JSON.parse(localStorage.getItem('tags')) || [])
  },[])

  useEffect(()=>{
    localStorage.setItem('tags', JSON.stringify(registeredTags))
  },[registeredTags])

  const Handlers = {

    handleOpenModalForm(){
      if(modalFormIsActive){
        setModalFormActive(false)
      }
      else{
        setModalFormActive(true)
      }
    },
  
    handleOpenModalDelete(){
      if(modalDeleteIsActive){
        setModalDeleteActive(false)
      }
      else{
        setModalDeleteActive(true)
      }
    },
  
    handleOpenModalTags(){
      if(modalTagsIsActive){
        setModalTagsActive(false)
      }
      else{
        setModalTagsActive(true)
      }
    },
  
    handleDarkActive(){
      if(isDark){
        setDarkTheme(false)
        localStorage.setItem('darkTheme', JSON.stringify(false))
      }
      else{
        setDarkTheme(true)
        localStorage.setItem('darkTheme', JSON.stringify(true))
      }
    },
  
    handleAddTag(event){
      event.preventDefault()
      setRegisteredTags(prevState => [...prevState, newTag])
      setNewTag("")
      setModalTagsActive(false)
    }
  
  }

  const Transactions = {

    formatValues(){
      const formatedAmount = Utilitys.formatAmount(amount)
      const formatedDate = Utilitys.formatDate(date)
      return {amount: formatedAmount, description: description, date: formatedDate, tag: tag}
    },

    clearFields(){
      setAmount(0)
      setDescription('')
      setDate('')
      setTag('')
    },

    deleteAll(){
      localStorage.setItem('transactions', JSON.stringify([]))
      setTransactions([])
      setModalDeleteActive(false)
    },

    add(formdata){
      let newTransaction = transactions
      newTransaction.push(formdata)
      localStorage.setItem('transactions', JSON.stringify(newTransaction))
      setTransactions(newTransaction)
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

      Transactions.add(formdata)

      setModalFormActive(false)

      Transactions.clearFields()
    },
  }

  return (
    <div className={isDark ? darkStyles.body : styles.body}>

      <header className={isDark? darkStyles.header : styles.header}>
        <label className={styles.switchButton}>
          <input className={styles.switchInput} type="checkbox" onChange={Handlers.handleDarkActive}/>
          <span className={styles.slide}></span>
        </label>
        <img src={logoImg} width="200" height="100" alt="Logo Dev Finances"/>
      </header>

      <main className={styles.main}>
        <MainButton 
          handleOpenModalForm={Handlers.handleOpenModalForm} 
          handleOpenModalDelete={Handlers.handleOpenModalDelete}
          handleOpenModalTags={Handlers.handleOpenModalTags}
        />
        <section className={styles.cardSection}>
          <h2 className={styles.subtitleHidden}>Balanço</h2>
          <Card type="Entrada" Transactions={Transactions} Img={incomeImg} value={Utilitys.formatCurrency(Transactions.incomes())}/>
          <Card type="Saída" Transactions={Transactions} Img={expenseImg} value={Utilitys.formatCurrency(Transactions.expenses())}/>
          <Card type="Total" Transactions={Transactions} Img={totalImg} value={Utilitys.formatCurrency(Transactions.total())} classname={Transactions.total() >= 0 ? 'positive' : 'negative'}></Card>
        </section>
        <section className={styles.tableSection}>
          <h2 className={styles.subtitleHidden}>Gastos Específicos</h2>
          <Table/>
        </section>
        <section className={styles.tableSection}>
          <h2 className={isDark? darkStyles.subtitle : styles.subtitle}>Saídas por tag</h2>
          <TagsPercentage totalExpenses={Transactions.expenses()} registeredTags={registeredTags}/>
        </section>
        <Modal modalIsActive={modalDeleteIsActive}>
          <h2 className={styles.subtitle}>Deseja deletar todas transações?</h2>
          <div className={styles.actionsForm}>
            <a 
              onClick={Handlers.handleOpenModalDelete}
              href="#"
              className={isDark? darkStyles.buttonCancel : styles.buttonCancel}>
              Cancelar
            </a>
            <button className={styles.buttonSave} onClick={Transactions.deleteAll}>Confirmar</button>
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
                    htmlFor="tag">Tag</label>
                <select 
                    type="select" 
                    id="tag" 
                    name="tag"
                    className={styles.input}
                    onChange={e => setTag(e.target.value)}
                    value={tag}
                >
                  <option value="">Selecione entre suas tags cadastradas</option>
                    {registeredTags.map(tag => {
                      return (<option key={tag} value={tag}>{tag}</option>)
                    })}
                </select>
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
                    onClick={Handlers.handleOpenModalForm}
                    href="#"
                    className={isDark? darkStyles.buttonCancel : styles.buttonCancel}>
                    Cancelar
                  </a>
                  <button className={styles.buttonSave}>Salvar</button>
                </div>
            </form>
          </div>
        </Modal>
        <Modal modalIsActive={modalTagsIsActive}>
          <div className={styles.form}>
            <h2 className={styles.subtitle}>Adicionar uma Tag</h2>
            <form onSubmit={Handlers.handleAddTag}>
              <div className={styles.input_group}>
                <label
                  className={styles.subtitleHidden}
                  htmlFor="description">Nome da Tag</label>
                <input
                  type="text" 
                  id="tag" 
                  name="tag"
                  placeholder="Exemplo: Comida"
                  className={styles.input}
                  onChange={e => setNewTag(e.target.value)}
                  value={newTag}
                  required
                />
                <small className={styles.help}>Tags vão te auxiliar a identificar as áreas que você mais tem gasto, ex: comida, lazer, contas da casa etc</small>
              </div>
              <div className={styles.actionsForm}>
                <a 
                  onClick={Handlers.handleOpenModalTags}
                  href="#"
                  className={isDark? darkStyles.buttonCancel : styles.buttonCancel}>
                  Cancelar
                </a>
                <button type="submit" className={styles.buttonSave}>Salvar</button>
              </div>
            </form>
          </div>
        </Modal>
      </main>
      <footer className={styles.footer}>
        <img src={copyLeftImg} alt="Copyleft" width="25" height="25"/>
        <h2 className={isDark? darkStyles.footerTitle : styles.footerTitle}>Fernanda Kipper</h2>
      </footer>
    </div>
  )
}