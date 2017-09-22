const Vue = require('vue')
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-better-router');
const router = Router().loadMethods();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

router.get('*', (ctx, next) => {

  const app = new Vue({
    data: {
      url: ctx.request.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  const context = {
    title: 'hello222',
    meta: `
      <meta ...>
      <meta ...>
    `
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      return ctx.body = 'Internal Server Error'
    }
    return ctx.body = html
    
  })   

});

app.use(router.middleware());

app.listen(3000, () => {
  console.log('Listening at 3000...')
});