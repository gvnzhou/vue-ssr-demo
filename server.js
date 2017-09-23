const Vue = require('vue')
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-better-router');
const router = Router().loadMethods();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
const createApp = require('./app');


const createApp = require('/path/to/built-server-bundle.js')


router.get('*', (ctx, next) => {
  const context = { url: ctx.request.url }


  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        return ctx.body = 'Internal Server Error'
      } else {
        return ctx.body = html
      }
    })   
  })

});

app.use(router.middleware());

app.listen(3000, () => {
  console.log('Listening at 3000...')
});