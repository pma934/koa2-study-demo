module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome' //添加局部变量title，局部变量在模板页面优先于全局变量，但是在后台中不会覆盖全局变量
        });
    },
};