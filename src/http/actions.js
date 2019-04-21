export const HTTP_REQUEST = 'http/http-request'
export const CLEAR_REQUEST = 'http/clear-request'

export function sendingRequest (id) {
  return {
    type: HTTP_REQUEST,
    id,
    loading: true
  }
}

export function receievedResponse (id, extras) {
  return {
    type: HTTP_REQUEST,
    id,
    loading: false,
    ...extras
  }
}

export function clearRequest (id) {
  return {type: CLEAR_REQUEST, id}
}
