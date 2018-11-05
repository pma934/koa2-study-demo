const md5 = require('md5')
const sqlapi = require('../api/sqlapi');

module.exports = {
    'POST /UserControllers/login': async (ctx, next) => {
        var t = ctx.request.body;
        t.password = md5(t.password);
        await sqlapi.login(t).then(result => { //成功时返回了msg,type,id,失败时只返回了msg,type
            let res = result;
            ctx.response.body = res;
            if (typeof (res.id) === 'undefined' && res.type !== 'success') {
                //登陆失败
                console.log("登陆失败");
            } else {
                //登陆成功
                console.log("登陆成功");
                ctx.session = {
                    user: t.name,
                    id: res.id,
                }
            }
        })
    },

    'POST /UserControllers/regist': async (ctx, next) => {
        var t = ctx.request.body;
        t.password = md5(t.password);
        var regist = await sqlapi.regist(t);
        ctx.response.body = regist;
    },


    'GET /UserControllers/logout': async (ctx, next) => {
        ctx.session = null;
        console.log('登出成功')
        ctx.body = true
    },
}