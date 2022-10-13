export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common['X-RapidAPI-Key'] = '8fe341bed8mshe67d8a9a9771c07p126c00jsnb18d44dd4abc';
    config.headers.common['X-RapidAPI-Host'] = 'shazam-core.p.rapidapi.com';
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
