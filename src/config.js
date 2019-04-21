let config = {
  application: 'Gradebook',
  environment: global.NODE_ENV,
  version: global.VERSION,
  apiBaseUrl: 'http://localhost:5006',
  esriTileUrlTemplate: null,
  admin: {
    name: 'Willl Darden',
    email: 'wldarden@gmail.com'
  },
  appLogo: '',
  gitVersion: global.gitVersion,
  buildTimestamp: global.buildTimestamp
}

if (global.API_URI) {
  config.apiBaseUrl = global.API_URI
}

export default config
