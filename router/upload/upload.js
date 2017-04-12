/**
 * Created by zhangyong on 2016/10/18.
 */
var express = require('express'),
    router = express.Router(),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    thenjs = require('thenjs'),
    formidable = require('formidable'),
    manage = require('../../models/admin/manage.js'),
    dateUtils=require('../../dist/common/js/dateUtils.js');

router.post('/uploadImg', function (req, res) {
    try {
        var form = new formidable.IncomingForm();
        form.uploadDir = './dist/upload/tmp';
        var msger = {
            fileName:[]
        };
        form.parse(req, function (error, fields, files) {
            for (var key in files) {
                var file = files[key];
                var fName =  key ;
                console.log("filename==="+fName);
                switch (file.type) {
                    case "image/jpeg":
                        fName = fName + ".jpg";
                        break;
                    case "image/png":
                        fName = fName + ".png";
                        break;
                    case "image/gif":
                        fName = fName + ".gif";
                        break;
                    default :
                        fName = fName + ".png";
                        break;
                }
                console.log(file.size);
                var uploadDir = "./dist/upload/img/" + fName;
                fs.rename(file.path, uploadDir, function (err) {
                    if (err) {
                        throw new Error(err);
                    }
                });
                msger.fileName.push(fName);
            }
            res.json({code: 0, msg: msger.fileName,filePath:'/upload/img/'});
        });
    }
    catch (err) {
        res.json({code: -1, msg: err});
    }
});
router.post('/uploadVideo', function (req, res) {
    try {
        var form = new formidable.IncomingForm();
        form.uploadDir = './dist/upload/tmp';
        var msger = {
            fileName:[]
        };
        form.parse(req, function (error, fields, files) {
            for (var key in files) {
                var file = files[key];
                var fName =  key;
                console.log("filename==="+fName);
                console.log("file.type==="+file.type);
                switch (file.type) {
                    case "video/mp4":
                        fName = fName + ".mp4";
                        break;
                    case "video/ogg":
                        fName = fName + ".ogg";
                        break;
                    case "video/H264":
                        fName = fName + ".mp4";
                        break;
                    case "video/mpeg":
                        fName = fName + ".mpeg";
                        break;
                    default :
                        fName = fName + ".mp4";
                        break;
                }
                console.log(file.size);
                var uploadDir = "./dist/upload/video/" + fName;
                fs.rename(file.path, uploadDir, function (err) {
                    if (err) {
                        throw new Error(err);
                    }
                });
                msger.fileName.push(fName);
            }
            res.json({code: 0, msg: msger.fileName,filePath:'/upload/video/'});
        });
    }
    catch (err) {
        res.json({code: -1, msg: err});
    }
});
router.post('/uploadFile', function (req, res) {
    thenjs(function(cont){
        try {
            var form = new formidable.IncomingForm();
            form.uploadDir = './dist/upload/tmp';
            var msger = {};
            form.parse(req, function (error, fields, files) {
                for (var key in files) {
                    var file = files[key];
                    var fName = new Date().pattern('yyyyMMddhhmmss');
                    console.log(file.size);
                    var uploadDir = "./dist/upload/files/" + fName+'.xlsx';
                    fs.rename(file.path, uploadDir, function (err) {
                        if (err) {
                            throw new Error(err);
                        }else{
                            msger.fileName = fName;
                            msger.uploadDir=uploadDir;
                            cont(null,msger);
                            return;
                        }
                    });
                }
            });
        }
        catch (err) {
            cont(err);
        }
    }).then(function(cont,result){
        console.log(JSON.stringify(result));
        manage.uploadExcelToBase(result.uploadDir,function(err,ret){
            if(err){
                cont(err);
            }else{
                cont(null,{msg:result,userInfo:ret});
            }
        });
    }).fin(function(cont,err,result){
        console.log(err);
        if(err){
            res.json({code: -1, msg: err});
        }else{
            res.json({code: 0, msg: result.msg,userInfo:result.userInfo});
        }
    });
});
router.post('/saveImg',function(req,res){
    manage.saveImg(req.body,function(err,result){
        if(err){
            res.send({error:'图片保存失败！'});
        }else{
            res.send({success:'图片保存成功！'});
        }
    });
});
module.exports = router;