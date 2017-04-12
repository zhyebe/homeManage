/**
 * Created by zhangyong on 2017/03/07.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    xlsx=require('xlsx'),
    fs = require("fs"),
    interface=require('../../service/interface.js'),
    $sql=require('./healthyDao');
var async = require('async');
var config=require('../../config');
var key=require('../../service/rsa.js');
var dateUtils=require('../../dist/common/js/dateUtils.js');
var consoleMsg = require('../consoleMsg.js');

exports.getBloodAll = function getBloodAll(arg,user_id,callback){
    var draw = arg.draw,
        start = parseInt(arg.start),
        length = parseInt(arg.length);
    var sql = "";
    var param = [];
    var sqlCount = "";
    var paramCount = [];
    if(user_id == 1){
        sql = $sql.GET_ALL_HEALTHY;
        param = [start,length];
        sqlCount = $sql.GET_ALL_HEALTHY_COUNT;
        paramCount = [1];
    }else{
        sql = $sql.GET_HEALTHY;
        param = [user_id,start,length];
        sqlCount = $sql.GET_HEALTHY_COUNT;
        paramCount = [user_id];
    }
    thenjs(function(cont){
        connection.queryArg(sqlCount,paramCount,function(err,result){
            if(err){
                consoleMsg.errors("getBloodAll",err);
                cont(err);
            }else{
                cont(null,result);
            }
        });
    }).then(function(cont,result){
        var sum = result[0].sum;
        connection.queryArg(sql,param,function(err,rets){
            if(err){
                consoleMsg.errors("getBloodAll",err);
                cont(err);
            }else{
                var formatResult = {
                    "draw": draw,
                    "recordsTotal": sum,
                    "recordsFiltered": sum,
                    "data": []
                };
                for(var i=0;i<rets.length;i++){
                    var blood = rets[i];
                    var tmp = [];
                    var obj=JSON.stringify(blood);
                    tmp.push(blood.id);
                    tmp.push(blood.real_name);
                    tmp.push(blood.high_pressure+blood.pressure_unit);
                    tmp.push(blood.low_pressure+blood.pressure_unit);
                    tmp.push(blood.heart_rate+blood.heart_unit);
                    tmp.push(blood.body_tmp);
                    tmp.push(blood.survey_time);
                    tmp.push(blood.update_time);
                    tmp.push('<input type="button" style="margin-right: 20px;" class="inpt btn btn-primary" value="修改" onclick=\'editBlood('+obj+');\'><input type="button" class="inpt btn btn-danger" value="删除" onclick=\'deleteBlood('+obj+');\'>');
                    formatResult.data.push(tmp);
                }
                cont(null,formatResult);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            consoleMsg.errors("getBloodAll",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.updateBlood = function updateBlood(arg,callback){
    var param = [arg.user_id,arg.high_pressure,arg.low_pressure,arg.heart_rate,arg.body_tmp,arg.survey_time,arg.update_time,arg.id];
    connection.queryArg($sql.UPDATE_HEALTHY,param,function(err,result){
        if(err){
            consoleMsg.errors("updateBlood",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.addBlood = function addBlood(arg,callback){
    var param = [arg.user_id,arg.high_pressure,arg.low_pressure,arg.heart_rate,arg.body_tmp,arg.survey_time,arg.update_time];
    connection.queryArg($sql.ADD_HEALTHY,param,function(err,result){
        if(err){
            consoleMsg.errors("addBlood",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.deleteBlood = function deleteBlood(arg,callback){
    var param = [arg.id];
    connection.queryArg($sql.DELETE_HEALTHY,param,function(err,result){
        if(err){
            consoleMsg.errors("deleteBlood",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getUserAll =function getUserAll(arg,callback){
    var sql ="";
    var sqlParam = [];
    if(arg.id == 1){
        sql = $sql.GET_USER_ALL;
        sqlParam = [1];
    }else{
        sql = $sql.GET_USER;
        sqlParam = [arg.id];
    }
    connection.queryArg(sql,sqlParam,function(err,result){
        if(err){
            consoleMsg.errors("getUserAll",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};