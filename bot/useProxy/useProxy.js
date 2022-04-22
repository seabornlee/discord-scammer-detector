const useProxy = (Proxy_Url) => {
  const proxy = require('node-global-proxy').default
  proxy.setConfig({
    http: Proxy_Url,
    https: Proxy_Url,
  })
  proxy.start()
}

module.exports = { useProxy }
