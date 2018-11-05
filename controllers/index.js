module.exports = {
    'GET /': async (ctx, next) => {
        if (ctx.session && ctx.session.user) {
            ctx.render('index.html', { //render是重新渲染页面，页面并不会被重定向，重定向用redirect
                title: '首页', //添加局部变量title，局部变量在模板页面优先于全局变量，但是在后台中不会覆盖全局变量
                username:ctx.session.user,
            })
        } else {
            ctx.render('login.html', { //render是重新渲染页面，页面并不会被重定向，重定向用redirect
                title: '登陆', //添加局部变量title，局部变量在模板页面优先于全局变量，但是在后台中不会覆盖全局变量           
            })
        }
    },
}