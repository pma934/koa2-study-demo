/*
 * @Author: zxz 
 * @Date: 2018-11-05 20:06:12 
 * @Last Modified by: zxz
 * @Last Modified time: 2018-11-05 20:06:34
 * @note: 按照程序运行环境选择MySQL配置文件
 */

const defaultConfig = './sql_config-default.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = './sql_config-override.js';
const testConfig = './sql_config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === `test`) {
    console.log(`test`);
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;

// console.log(`------------------------`);
// console.log(process.env.NODE_ENV);
// console.log(`------------------------`);