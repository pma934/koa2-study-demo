const model = require('./model');

let Client = model.client;
let Msg = {
    success: (msg) => {
        return {
            type: "success",
            msg: msg
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
                   return Msg.success("登录成功！");
               }
            }
            return Msg.faile("账号密码错误！","password");
        } else {
            return Msg.faile("用户名不存在！","name");
        }
    }
};