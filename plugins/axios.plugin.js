export default function ({ $axios, $config }) {
  $axios.onRequest((config) => {
    config.headers.common['X-RapidAPI-Key'] = $config.rapidapiKey;
    config.headers.common['X-RapidAPI-Host'] = $config.rapidapiHost;
    config.headers.common['Access-Control-Allow-Origin'] = '*';
  })

  $axios.onError((error) => {
    const statusCode = parseInt(error.response && error.response.status)

    // fatal error
    if (statusCode >= 500) {
    }

    // too many request
    if (statusCode === 429) {
    }

    // invalid data
    if (statusCode === 422) {
    }

    // conflict
    if (statusCode === 409) {
    }

    // timeout
    if (statusCode === 408) {
    }

    // not found
    if (statusCode === 404) {
    }

    // not permission
    if (statusCode === 403) {
    }

    // not be authenticated
    if (statusCode === 401) {
    }

    // bad Request
    if (statusCode === 400) {
      // eslint-disable-next-line no-console
    }
  })
}
