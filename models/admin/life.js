/**
 * Created by zhangyong on 2017/03/07.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    xlsx=require('xlsx'),
    fs = require("fs"),
    interface=require('../../service/interface.js'),
    $sql=require('./lifeDao');
var async = require('async');
var config=require('../../config');
var key=require('../../service/rsa.js');
var dateUtils=require('../../dist/common/js/dateUtils.js');
var consoleMsg = require('../consoleMsg.js');

exports.getLifeAll = function getLifeAll(arg,user_id,callback){
    var draw = arg.draw,
        start = parseInt(arg.start),
        length = parseInt(arg.length);
    var sql = "";
    var param = [];
    var sqlCount = "";
    var paramCount = [];
    if(user_id == 1){
        sql = $sql.GET_LIFE_ALL;
        param = [start,length];
        sqlCount = $sql.GET_LIFE_ALL_COUNT;
        paramCount = [1];
    }else{
        sql = $sql.GET_LIFE;
        param = [user_id,start,length];
        sqlCount = $sql.GET_LIFE_COUNT;
        paramCount = [user_id];
    }
    thenjs(function(cont){
        connection.queryArg(sqlCount,paramCount,function(err,result){
            if(err){
                consoleMsg.errors("getLifeAll",err);
                cont(err);
            }else{
                cont(null,result);
            }
        });
    }).then(function(cont,result){
        var sum = result[0].sum;
        connection.queryArg(sql,param,function(err,rets){
            if(err){
                consoleMsg.errors("getLifeAll",err);
                cont(err);
            }else{
                var formatResult = {
                    "draw": draw,
                    "recordsTotal": sum,
                    "recordsFiltered": sum,
                    "data": []
                };
                for(var i=0;i<rets.length;i++){
                    var life = rets[i];
                    var tmp = [];
                    var obj=JSON.stringify(life);
                    tmp.push(life.id);
                    tmp.push(life.real_name);
                    tmp.push(life.breakfast);
                    tmp.push(life.breakfast_time);
                    tmp.push(life.lunch);
                    tmp.push(life.lunch_time);
                    tmp.push(life.dinner);
                    tmp.push(life.dinner_time);
                    tmp.push(life.week_up_time);
                    tmp.push(life.sleep_time);
                    tmp.push(life.sleep_long);
                    tmp.push(life.walk_step);
                    tmp.push(life.calorie);
                    tmp.push(life.update_time);
                    tmp.push('<input type="button" style="margin-right: 20px;" class="inpt btn btn-primary" value="修改" onclick=\'editLife('+obj+');\'><input type="button" class="inpt btn btn-danger" value="删除" onclick=\'deleteLife('+obj+');\'>');
                    formatResult.data.push(tmp);
                }
                cont(null,formatResult);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            consoleMsg.errors("getLifeAll",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};

exports.addLife = function addLife(arg,callback){
    arg.sleep_long = config.sleepLong(arg.sleep_time,arg.week_up_time);
    arg.calorie = config.calculateCal(parseInt(arg.walk_step));
    var param = [arg.user_id,arg.breakfast,arg.breakfast_time,arg.lunch,arg.lunch_time,arg.dinner,
        arg.dinner_time,arg.week_up_time,arg.sleep_time,arg.sleep_long,arg.walk_step,arg.calorie,arg.update_time];
    connection.queryArg($sql.ADD_LIFE,param,function(err,result){
        if(err){
            consoleMsg.errors("addLife",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};

exports.updateLife = function updateLife(arg,callback){
    arg.sleep_long = config.sleepLong(arg.sleep_time,arg.week_up_time);
    arg.calorie = config.calculateCal(parseInt(arg.walk_step));
    var param = [arg.user_id,arg.breakfast,arg.breakfast_time,arg.lunch,arg.lunch_time,arg.dinner,
        arg.dinner_time,arg.week_up_time,arg.sleep_time,arg.sleep_long,arg.walk_step,arg.calorie,arg.update_time,arg.id];
    consoleMsg.results("updateBlood",param);
    connection.queryArg($sql.UPDATE_LIFE,param,function(err,result){
        if(err){
            consoleMsg.errors("updateBlood",err);
            callback(err);
        }else{
            consoleMsg.results("updateBlood",result);
            callback(null,result);
        }
    });
};

exports.deleteLife = function deleteLife(arg,callback){
    var param = [arg.id];
    connection.queryArg($sql.DELETE_LIFE,param,function(err,result){
        if(err){
            consoleMsg.errors("deleteBlood",err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};