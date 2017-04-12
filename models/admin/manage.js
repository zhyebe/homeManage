/**
 * Created by zhangyong on 2016/10/18.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    xlsx=require('xlsx'),
    fs = require("fs"),
    interface=require('../../service/interface.js'),
    $sql=require('./manageDao');
var async = require('async');
var config=require('../../config');
var key=require('../../service/rsa.js');
var dateUtils=require('../../dist/common/js/dateUtils.js');
var consoleMsg = require('../consoleMsg.js');

exports.getMessages = function getMessages(arg,user_id,callback){
    var draw = arg.draw,
        start = parseInt(arg.start),
        length = parseInt(arg.length);
    var sql = "";
    var sql_count = "";
    var sql_param = [];
    var sql_count_param = [];
    if(user_id == 1){
        sql = $sql.GET_ALL;
        sql_count = $sql.GET_ALL_COUNT;
        sql_param = [start,length];
        sql_count_param = [1];
    }else{
        sql = $sql.GET;
        sql_count = $sql.COUNT;
        sql_param = [user_id,start,length];
        sql_count_param = [user_id];
    }
    thenjs(function(cont){
        connection.queryArg(sql_count,sql_count_param,function(err,result){
            if(err){
                consoleMsg.errors('getMessages',err);
                cont(err);
            }else{
                cont(null,result)
            }
        });
    }).then(function(cont,ret){
        var sum=ret[0].sum;
        connection.queryArg(sql,sql_param,function(err,result){
            if(err){
                consoleMsg.errors('getMessages',err);
                callback(err,null);
            }else{
                async.map(result,function(item,cb){
                    item.msg_pwd=key.decrypt(item.msg_pwd,'utf-8');
                    cb(null,item);
                },function(errs,rets){
                    if(errs){
                        cont(errs,null);
                    }else{
                        var formatResult = {
                            "draw": draw,
                            "recordsTotal": sum,
                            "recordsFiltered": sum,
                            "data": []
                        };
                        for(var i=0;i<rets.length;i++){
                            var tmp=[];
                            var obj=JSON.stringify(rets[i]);
                            tmp.push(rets[i].id);
                            tmp.push(rets[i].msg_name);
                            tmp.push(rets[i].msg_pwd);
                            tmp.push(rets[i].update_time);
                            tmp.push('<input type="button" style="margin-right: 20px;" class="inpt btn btn-primary" value="修改" onclick=\'editUser('+obj+');\'><input type="button" class="inpt btn btn-danger" value="删除" onclick=\'deleteUser('+obj+');\'>');
                            formatResult.data.push(tmp);
                        }
                        cont(null,formatResult);
                    }
                });
            }
        });
    }).fin(function(cont,err,ret){
        if(err){
            consoleMsg.errors('getMessages',err);
            callback(err,null);
        }else{
            consoleMsg.results("getMessages",ret);
            callback(null,ret);
        }
    });
};
exports.addMsg = function addMsg(arg,callback){
    var param=[arg.user_id,arg.msg_name,key.encrypt(arg.msg_pwd,'base64'),arg.update_time];
    connection.queryArg($sql.ADD,param,function(err,result){
        if(err){
            consoleMsg.errors("addMsg",err);
        }else{
            callback(null,result);
        }
    });
};
exports.saveMsg = function saveMsg(arg,callback){
    var param=[arg.msg_name,key.encrypt(arg.msg_pwd,'base64'),arg.update_time,arg.id];
    connection.queryArg($sql.UPDATE,param,function(err,result){
        if(err){
            consoleMsg.errors("saveMsg",err);
        }else{
            callback(null,result);
        }
    });
};
exports.deleteMsg = function deleteMsg(arg,callback){
    var param=[arg.id];
    connection.queryArg($sql.DELETE,param,function(err,result){
        if(err){
            consoleMsg.errors("deleteMsg",err);
        }else{
            callback(null,result);
        }
    });
};

//用户相关
exports.getUsers =function getUsers(arg,callback) {
    var draw = arg.draw,
        start = parseInt(arg.start),
        length = parseInt(arg.length);
    thenjs(function (cont) {
        connection.query($sql.GET_USER_ALL_COUNT, function (err, result) {
            if (err) {
                consoleMsg.errors('getUsers', err);
                cont(err);
            } else {
                cont(null, result)
            }
        });
    }).then(function (cont, result) {
        var sum = result[0].sum;
        connection.queryArg($sql.GET_USER_ALL, [start, length], function (err, ret) {
            if (err) {
                consoleMsg.errors('getUsers', err);
                callback(err, null);
            } else {
                async.map(ret, function (item, cb) {
                    item.password = key.decrypt(item.password, 'utf-8');
                    cb(null, item);
                }, function (errs, rets) {
                    if (errs) {
                        cont(errs, null);
                    } else {
                        var formatResult = {
                            "draw": draw,
                            "recordsTotal": sum,
                            "recordsFiltered": sum,
                            "data": []
                        };
                        for (var i = 0; i < rets.length; i++) {
                            var tmp = [];
                            var obj = JSON.stringify(rets[i]);
                            tmp.push(rets[i].id);
                            tmp.push(rets[i].username);
                            tmp.push('<input type="password" style="cursor:not-allowed;background:#eee;" name="password" value="'+rets[i].password+'" disabled>');
                            tmp.push(rets[i].real_name);
                            tmp.push(rets[i].age);
                            tmp.push(rets[i].birthday);
                            tmp.push('<img width="65" height="70" src="'+rets[i].head_url+'">');
                            tmp.push(rets[i].update_time);
                            tmp.push('<input type="button" style="margin-right: 20px;" class="inpt btn btn-primary" value="修改" onclick=\'editUser(' + obj + ');\'><input type="button" class="inpt btn btn-danger" value="删除" onclick=\'deleteUser(' + obj + ');\'>');
                            formatResult.data.push(tmp);
                        }
                        cont(null, formatResult);
                    }
                });
            }
        });
    }).fin(function (cont, err, result) {
        if (err) {
            consoleMsg.errors('getUsers', err);
            callback(err, null);
        } else {
            consoleMsg.results("getUsers", result);
            callback(null, result);
        }
    });
};
exports.getUser = function getUser(arg,callback){
    var user_id = arg.id;
    connection.queryArg($sql.GET_USER,[user_id],function(err,result){
        if(err||result.length<=0){
            consoleMsg.errors("getUser",err);
            callback(err);
        }else{
            result[0].password = key.decrypt(result[0].password,'utf-8');
            callback(null,result)
        }
    });
};
exports.updateUsers = function updateUsers(arg,callback){
    var param = [arg.username,key.encrypt(arg.password,'base64'),arg.birthday,arg.age,arg.real_name,arg.head_url,arg.update_time,arg.id];
    connection.queryArg($sql.UPDATE_USERS,param,function(err,result){
        if(err){
            consoleMsg.errors("updateUsers",err);
            callback(err);
        }else{
            callback(null,result)
        }
    });
};
exports.updateUser = function updateUser(arg,callback){
    var param = [arg.birthday,arg.age,arg.real_name,arg.head_url,arg.update_time,arg.id];
    connection.queryArg($sql.UPDATE_USER,param,function(err,result){
        if(err){
            consoleMsg.errors("updateUser",err);
            callback(err);
        }else{
            consoleMsg.results("updateUser",result);
            callback(null,result)
        }
    });
};
exports.addUser = function addUser(arg,callback){
    var param = [arg.username,key.encrypt(arg.password,'base64'),arg.birthday,arg.age,arg.real_name,arg.head_url,arg.update_time];
    connection.queryArg($sql.ADD_USER,param,function(err,result){
        if(err){
            consoleMsg.errors("updateUser",err);
            callback(err);
        }else{
            callback(null,result)
        }
    });
};
exports.deleteUser = function deleteUser(arg,callback){
    var urls = arg.head_url.split('/');
    var head_url =urls[urls.length-1];
    var head_path = './dist/upload/img/'+head_url;
    var param = [arg.id];
    connection.queryArg($sql.DELETE_USER,param,function(err,result){
        if(err){
            consoleMsg.errors("deleteUser",err);
            callback(err);
        }else{
            fs.unlinkSync(head_path);
            callback(null,result)
        }
    });
};
exports.updatePwd = function updatePwd(arg,callback){
    var pwd = key.encrypt(arg.password,'base64');
    var param = [pwd,arg.id];
    connection.queryArg($sql.UPDATE_PWD,param,function(err,result){
        if(err){
            consoleMsg.errors("updatePwd",err);
            callback(err);
        }else{
            callback(null,result)
        }
    });
};