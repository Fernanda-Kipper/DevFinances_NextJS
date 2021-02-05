export const Utilitys = {

    formatAmount(value){
      value = Number(value) * 100
      return Math.round(value)
    },

    formatDate(date){
      const splittedDate = date.split("-")
      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(number){
      const signal = number >= 0 ? "" : "-"
      number = String(number).replace(/\D/g, "")
      number = Number(number) / 100
      number = number.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
      })

      return signal + number
    }
}