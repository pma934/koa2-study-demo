/*
 * @Author: zxz 
 * @Date: 2018-11-05 20:08:20 
 * @Last Modified by: zxz
 * @Last Modified time: 2018-11-14 17:25:15
 * @main: 主程序
 */
process.env.NODE_ENV = !process.env.NODE_ENV?'test':process.env.NODE_ENV;

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./middleware/controller');
const staticFiles = require('./middleware/static-files');
const templating = require('./middleware/templating');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const sql_config = require('./config/sql_config');//数据库配置信息

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV);

const sessionMysqlConfig= {
  user: sql_config.username,
  password: sql_config.password,
  database: sql_config.database,
  host: sql_config.host,
}

// 配置session中间件
app.use(session({
  key: 'Dog cards',
  store: new MysqlStore(sessionMysqlConfig)
}))

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