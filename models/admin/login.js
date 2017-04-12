/**
 * Created by zhangyong on 2016/10/10.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    $sql=require('./loginDao');
//获取用户信息
exports.getUser=function getUser(arg,callback){
    connection.queryArg($sql.LOGINUSER,arg,function(err,result){
        if(err||result.length<=0){
            callback(err,{error:'暂无数据'});
        }else{
            callback(null,result);
        }
    });
};