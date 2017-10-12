const Vue = require('vue')
const server = require('express')()

const serverBundle = require('/dist/vue-ssr-server-bundle.json')

const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐  
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8'),
  clientManifest // （可选）客户端构建 manifest
})

server.get('*', (req, res) => {

  const context = { url: req.url }
  
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})
server.listen(8080)