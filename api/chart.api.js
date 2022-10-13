export default ({$axios}) => ({
  getTopCharts: () => {
    return new Promise((resolve, reject) => {
      $axios.$get('/charts/world')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
})
