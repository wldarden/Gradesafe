export const coalesceErrors = errors => {
  var data = {}

  const {status, statusText, config} = (errors.response || {})

  if (errors.response && errors.response.data) {
    data = errors.response.data
  } else {
    data = {
      message: ''
    }
  }

  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'testing') {
    console.log(errors)
  }

  // need to handle data.message since data could potentially be undefined.
  if (!Array.isArray(errors)) {
    return [{
      'status': status || '',
      'title': statusText || '',
      'detail': data.message || '',
      'data': data || '',
      'config': config || ''
    }]
  }

  return errors
}
