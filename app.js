const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const staticFiles = require('./static-files');
const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction);


//第二个middleware处理静态文件：
if (! isProduction) {
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//第三个middleware解析POST请求：(这个貌似放在最前面也没事？)
app.use(bodyParser());

//第四个middleware负责给ctx加上render()来使用Nunjucks：
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// 最后一个middleware处理URL路由：
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
