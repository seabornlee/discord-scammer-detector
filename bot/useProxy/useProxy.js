const useProxy = (PROXY_URL) => {
  const proxy = require('node-global-proxy').default
  proxy.setConfig({
    http: PROXY_URL,
    https: PROXY_URL,
  })
  proxy.start()
}

module.exports = { useProxy }
