import chartAPI from '~/api/chart.api.js'

export default ({ app }, inject) => {
  const { $axios, $config } = app

  inject('chartAPI', chartAPI({ $axios, $config }))
}
