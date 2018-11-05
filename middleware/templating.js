/*
 * @Author: zxz 
 * @Date: 2018-11-05 19:51:45 
 * @Last Modified by:   zxz 
 * @Last Modified time: 2018-11-05 19:51:45 
 * @note: 页面渲染框架
 */
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
    return async (ctx, next) => { //闭包？
        // 给ctx绑定render函数:
        ctx.render =  (view, model) => {
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';           
        };

        ctx.addGlobal =(name, value) => env.addGlobal(name, value);

        ctx.getGlobal =(name) => env.getGlobal(name);

        ctx.bibao = () => {console.log(`***********************
*
*
*      bibao
* 
* 
***********************`)}
        // 继续处理请求:
        await next();
    };
}

module.exports = templating;