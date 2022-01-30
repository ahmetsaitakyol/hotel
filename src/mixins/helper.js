export default {
  methods: {
    convertToLocaleDateFormat: (date) => {
      if (!date) {
        return ''
      }
      const formattedDate = new Date(date)
      return formattedDate.toLocaleDateString()
    },
    diffDays: (start, end) => {
      const startDate = new Date(start)
      const endDate = new Date(end)
      const diffTime = Math.abs(endDate - startDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays + 1
    },
    expirationDateControl: (date) => {
      const today = new Date()
      const expireDate = new Date(date)
      if (expireDate - today <= 0) {
        return false
      }
      return true
    },
    getUnitWithZeroPrefix: (unit) => {
      if (!unit) {
        return ''
      }
      return ('0' + unit).slice(-2)
    }
  }
}
