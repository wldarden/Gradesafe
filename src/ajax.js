import axios from 'axios'
import config from './config'
import store from './store'
import {getCookie} from './http_utils'

const client = axios.create({baseURL: config.apiBaseUrl})

client.interceptors.request.use(config => {
  const token = store.getState().getIn(['Users', 'realUser', 'authToken'], getCookie('AUTH')) || ''
  if (token) {
    config.headers = {Authorization: token}
  }
  return config
})

export const responseInterceptor = resp => {
  return Promise.reject(resp)
}

client.interceptors.response.use(resp => resp, responseInterceptor)

export default client

export const rawClient = axios.create({baseURL: config.apiBaseUrl})
