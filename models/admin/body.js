/**
 * Created by zhangyong on 2017/03/06.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    xlsx=require('xlsx'),
    fs = require("fs"),
    interface=require('../../service/interface.js'),
    $sql=require('./bodyDao');
var async = require('async');
var config=require('../../config');
var key=require('../../service/rsa.js');
var dateUtils=require('../../dist/common/js/dateUtils.js');
var consoleMsg = require('../consoleMsg.js');

exports.getBodyAll = function getBodyAll(callback){
    thenjs(function(cont){
        connection.query($sql.GET_BODY_ALL,function(err,result){
            if(err){
                consoleMsg.errors('getBodyAll',err);
                cont(err);
            }else{
                cont(null,result);
            }
        });
    }).then(function(cont,result){
        var body = null;
        if(result.length>0){
            body = result[0];
            body.users = [];
        }else{
            body = {
                id:'',
                user_id:'',
                height:'',
                weight:'',
                cm_unit:'',
                weight_unit:'',
                chest_size:'',
                waist_size:'',
                hip_size:'',
                vital_capacity:'',
                ml_unit:'',
                eye_sight:'',
                users:[]
            };
        }
        connection.query($sql.GET_ALL_USER,function(err,ret){
            if(err){
                consoleMsg.errors('getBodyAll',err);
                cont(null,body);
            }else{
                body.users = ret;
                cont(null,body);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            consoleMsg.errors('getBodyAll',err);
            callback(err);
        }else{
            consoleMsg.results('getBodyAll',result);
            callback(null,result);
        }
    });
};
exports.getBody = function getBody(arg,callback){
    thenjs(function(cont){
        connection.queryArg($sql.GET_BODY,[arg.id],function(err,result){
            if(err){
                consoleMsg.errors('getBodyAll',err);
                cont(err);
            }else{
                cont(null,result);
            }
        });
    }).then(function(cont,result){
        var body = null;
        if(result.length>0){
            body = result[0];
            body.users = [];
        }else{
            body = {
                id:'',
                user_id:'',
                height:'',
                weight:'',
                cm_unit:'',
                weight_unit:'',
                chest_size:'',
                waist_size:'',
                hip_size:'',
                vital_capacity:'',
                ml_unit:'',
                eye_sight:'',
                users:[]
            };
        }
        connection.queryArg($sql.GET_USER,[arg.id],function(err,ret){
            if(err){
                consoleMsg.errors('getBodyAll',err);
                cont(null,body);
            }else{
                body.users = ret;
                cont(null,body);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            consoleMsg.errors('getBodyAll',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};

exports.updateBody =  function updateBody(arg,callback){
    var sql = "";
    var sqlParam = [];
    if(arg.id&&arg.id!=""){
        sql = $sql.UPDATE_BODY;
        sqlParam = [arg.user_id,arg.height,arg.weight,arg.chest_size,arg.waist_size,arg.hip_size,arg.vital_capacity,arg.eye_sight,arg.survey_time,arg.update_time,arg.id];
    }else{
        sql = $sql.ADD_BODY;
        sqlParam = [arg.user_id,arg.height,arg.weight,arg.chest_size,arg.waist_size,arg.hip_size,arg.vital_capacity,arg.eye_sight,arg.survey_time,arg.update_time];
    }
    connection.queryArg(sql,sqlParam,function(err,result){
        if(err){
            consoleMsg.errors('updateBody',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};