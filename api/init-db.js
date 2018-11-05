/*
 * @Author: zxz 
 * @Date: 2018-11-05 19:56:22 
 * @Last Modified by: zxz
 * @Last Modified time: 2018-11-05 19:57:46
 * @note: 初始化数据库(会覆盖已有表格的内容)
 */

const model = require('../api/model.js');
model.sync();

console.log('init db ok.');