/*
 * @Author: zxz 
 * @Date: 2018-11-05 20:04:21 
 * @Last Modified by: zxz
 * @Last Modified time: 2018-11-05 20:07:33
 * @note: 默认的MySQL配置文件，process.env.NODE_ENV === 'production'时
 */

var config = {
    database: 'test', // 使用哪个数据库
    username: 'root', // 用户名
    password: '123456', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

module.exports = config;