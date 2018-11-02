const crypto = require('crypto');
const sqlapi = require('../sqlapi');


let tomd5 = (data) => crypto.createHash('md5').update(data).digest('hex');

module.exports = {
    'POST /myapi/login': async (ctx, next) => {
        var t = ctx.request.body;
        t.password = tomd5(t.password);
        var login = await sqlapi.login(t);
        ctx.response.body = login;
    },

    'POST /myapi/regist': async (ctx, next) => {
        var t = ctx.request.body;
        t.password = tomd5(t.password);
        var regist = await sqlapi.regist(t);
        ctx.response.body = regist;
    },

    'GET /myapi/loginSuccess': async (ctx, next) => {
        ctx.render('test.html', {
            title: '跳转测试' //添加局部变量title，局部变量在模板页面优先于全局变量，但是在后台中不会覆盖全局变量
        });
    },
}