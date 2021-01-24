import moneyImg from '../assets/money.png'
import copyLeftImg from '../assets/copyleft.png'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <header className={styles.header}>
      <h1 className={styles.title}>Carteira Virtual</h1>
      <img src={moneyImg} width="50" height="50" alt="Logo"/>
    </header>
    <main className={styles.main}>
      <section className={styles.cardSection}>
        <h2 className={styles.subtitle}>Balanço</h2>
        <div className={styles.card}>
          <h3 className={styles.subsubtitle}>Entradas</h3>
          <p className={styles.income}>2.000 R$</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subsubtitle}>Saídas</h3>
          <p className={styles.expense}>1.000 R$</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subsubtitle}>Total</h3>
          <p className={styles.income}>1.000 R$</p>
        </div>
      </section>
      <section className={styles.tableSection}>
        <h2 className={styles.subtitle}>Gastos Específicos</h2>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableTr}>
              <th className={styles.tableHeader}>Tipo de gasto</th>
              <th className={styles.tableHeader}>Data</th>
              <th className={styles.tableHeader}>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableTr}>
              <td className={styles.tableTd}>Comida</td>
              <td className={styles.tableTd}>23/12/2020</td>
              <td className={styles.tableTd}>37.50 R$</td>
            </tr>
            <tr className={styles.tableTr}>
              <td className={styles.tableTd}>Comida</td>
              <td className={styles.tableTd}>20/12/2020</td>
              <td className={styles.tableTd}>20.50 R$</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
    <footer className={styles.footer}>
      <img src={copyLeftImg} alt="Copyleft" width="30" height="30"/>
      <h2 className={styles.footerTitle}>Por Fernanda Kipper</h2>
    </footer>
    </>
  )
}