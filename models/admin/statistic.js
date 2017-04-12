/**
 * Created by zhangyong on 2017/03/08.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    xlsx=require('xlsx'),
    fs = require("fs"),
    interface=require('../../service/interface.js'),
    $sql=require('./statisticDao');
var async = require('async');
var config=require('../../config');
var key=require('../../service/rsa.js');
var dateUtils=require('../../dist/common/js/dateUtils.js');
var consoleMsg = require('../consoleMsg.js');

exports.getHeartDatas = function getHeartDatas(arg,callback){
    var type = arg.type;
    var types = $sql.ST_TYPE(type);
    var param = [types,arg.start_time,arg.end_time,arg.user_id];
    consoleMsg.results("param",param);
    connection.queryArg($sql.HEART_RATE,param,function(err,result){
        if(err){
            consoleMsg.errors("getHeartDatas",err);
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};
exports.getBloodPressureDatas = function getBloodPressureDatas(arg,callback){
    var type = arg.type;
    var types = $sql.ST_TYPE(type);
    var param = [types,arg.start_time,arg.end_time,arg.user_id];
    consoleMsg.results("param",param);
    connection.queryArg($sql.BLOOD,param,function(err,result){
        if(err){
            consoleMsg.errors("getBloodPressureDatas",err);
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};
exports.getSportDatas = function getSportDatas(arg,callback){
    var type = arg.type;
    var types = $sql.ST_TYPE(type);
    var param = [types,arg.start_time,arg.end_time,arg.user_id];
    consoleMsg.results("param",param);
    connection.queryArg($sql.SPORTS,param,function(err,result){
        if(err){
            consoleMsg.errors("getSportDatas",err);
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};