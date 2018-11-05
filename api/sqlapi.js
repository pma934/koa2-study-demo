/*
 * @Author: zxz 
 * @Date: 2018-11-05 20:02:16 
 * @Last Modified by: zxz
 * @Last Modified time: 2018-11-05 20:02:40
 * @note: 注册和登陆时连接数据库的api
 */

const model = require('../api/model');

let Client = model.client;
let Msg = {
    success: (msg,id) => {
        return {
            type: "success",
            msg: msg,
            id:id
        }
    },
    faile: (msg,elem) => {
        return {
            type: elem,
            msg: msg
        }
    },
}

module.exports = {
    regist: async (t) => {
        var isUsed = await Client.findAll({
            where: {
                name: t.name
            }
        });
        if (!isUsed.length) {
            var client = await Client.create(t);
            return Msg.success("注册成功！");
        } else {
            return Msg.faile("用户名已经存在！","name");
        }
    },

    login: async (t) => {
        var isUsed = await Client.findAll({
            where: {
                name: t.name
            }
        });
        if (isUsed.length) {
            for(let client of isUsed){ //for in  键   for of  值
               if (client.password == t.password){
                   return Msg.success("登录成功！",client.id);
               }
            }
            return Msg.faile("账号密码错误！","password");
        } else {
            return Msg.faile("用户名不存在！","name");
        }
    }
};