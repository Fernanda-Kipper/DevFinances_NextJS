import { useState } from 'react'

import moneyImg from '../assets/money.svg'
import copyLeftImg from '../assets/copyLeft.svg'
import minusImg from '../assets/minus.svg'
import plusImg from '../assets/plus.svg'
import expenseImg from '../assets/expense.svg'
import incomeImg from '../assets/income.svg'
import totalImg from '../assets/total.svg'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [test, setTest] = useState(false)

  const classname = ()=>{
    if(test){
      return styles.active
    }
    else{
      return styles.nonactive
    }
  }

  function handleOpenModal(){
    if(test){
      setTest(false)
    }
    else{
      setTest(true)
    }
  }

  return (
    <>
    <header className={styles.header}>
      <h1 className={styles.title}>Carteira Virtual</h1>
      <img src={moneyImg} width="50" height="50" alt="Logo"/>
    </header>
    <main className={styles.main}>
      <section className={styles.cardSection}>
        <h2 className={styles.subtitleHidden}>Balanço</h2>
        <div className={styles.card}>
        <h3 className={styles.subsubtitle}>
            <span>Entrada</span>
            <img src={incomeImg} alt="Image de entradas"/>
          </h3>
          <p className={styles.income}>2.000 R$</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subsubtitle}>
            <span>Saídas</span>
            <img src={expenseImg} alt="Image de saídas"/>
          </h3>
          <p className={styles.expense}>1.000 R$</p>
        </div>
        <div className={styles.totalCard}>
        <h3 className={styles.totalSubsubtitle}>
            <span>Total</span>
            <img src={totalImg} alt="Image de total"/>
          </h3>
          <p className={styles.total}>1.000 R$</p>
        </div>
      </section>
      <section className={styles.tableSection}>
        <h2 className={styles.subtitleHidden}>Gastos Específicos</h2>
        <a
          href="#"
          onClick={handleOpenModal}
          class={styles.button}>
            + Nova Transação
        </a>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableTr}>
              <th className={styles.tableHeader}>Tipo de gasto</th>
              <th className={styles.tableHeader}>Data</th>
              <th className={styles.tableHeader}>Valor</th>
              <th className={styles.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableTr}>
              <td className={styles.tableTd}>Comida</td>
              <td className={styles.tableTd}>23/12/2020</td>
              <td className={styles.tableTd}>37.50 R$</td>
              <td className={styles.tableTd}>  
                <img src={minusImg} alt=""/>
              </td>
            </tr>
            <tr className={styles.tableTr}>
              <td className={styles.tableTd}>Comida</td>
              <td className={styles.tableTd}>20/12/2020</td>
              <td className={styles.tableTd}>20.50 R$</td>
              <td className={styles.tableTd}>  
                <img src={minusImg} alt=""/>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class={classname()}>
            <div class={styles.modal}>
                <div class={styles.form}>
                    <h2 class={styles.subtitle}>Nova Transação</h2>
                    <form action="">
                        <div class={styles.input_group}>
                            <label 
                                class={styles.subtitleHidden}
                                for="description">Descrição</label>
                            <input 
                                type="text" 
                                id="description" 
                                name="description"
                                placeholder="Descrição"
                                class={styles.input}
                            />
                        </div>

                        <div class={styles.input_group}>
                            <label 
                                class={styles.subtitleHidden}
                                for="amount">Valor</label>
                            <input 
                                type="number"
                                step="0.01"
                                id="amount" 
                                name="amount"
                                placeholder="0,00"
                                class={styles.input}
                            />
                            <small class={styles.help}>Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais</small>
                        </div>

                        <div class={styles.input_group}>
                            <label 
                                class={styles.subtitleHidden} 
                                for="date">Data</label>
                            <input 
                                type="date" 
                                id="date" 
                                name="date"
                                class={styles.input}
                            />
                        </div>

                        <div class={styles.actionsForm}>
                            <a 
                            onClick={handleOpenModal}
                            href="#" 
                            class={styles.buttonCancel}>Cancelar</a>
                            <button class={styles.buttonSave}>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
    <footer className={styles.footer}>
      <img src={copyLeftImg} alt="Copyleft" width="30" height="30"/>
      <h2 className={styles.footerTitle}>Por Fernanda Kipper</h2>
    </footer>
    </>
  )
}