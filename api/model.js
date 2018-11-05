/*
 * @Author: zxz 
 * @Date: 2018-11-05 19:52:55 
 * @Last Modified by: zxz
 * @Last Modified time: 2018-11-05 19:53:19
 * @note: 自动扫描并导入所有Model
 */

const fs =require('fs');
const db =require('./db');

let files = fs.readdirSync(__dirname+'/../models');

let js_files = files.filter((f)=>{return f.endsWith('.js');}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/../models/' + f);
}

module.exports.sync = () => {
    db.sync();
};
