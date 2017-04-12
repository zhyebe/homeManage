/**
 * Created by zhangyong on 2016/07/23.
 */
var express = require('express'),
    router = express.Router(),
    key=require('../../service/rsa.js'),
    login=require('../../models/admin/login.js');
var captchapng=require('captchapng');
router.get('/', function(req, res) {
    res.render('admin/login',{title:'登陆',msg:'后台登陆页面，欢迎'});
});
router.post('/toLogin',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var code=req.body.code;
    if(code!=req.session.code){
        res.send({status:'0',msg:'验证码输入有误！',url:null});
        return;
    }
    var param=[username];
    login.getUser(param,function(err,result){
        if(err||result.error){
            res.send({status:'0',msg:'暂无此用户！',url:null});
        }else{
            var ret=result[0];
            if(key.decrypt(ret.password,'utf-8')==password){
                req.session.user={
                    userID:'all',
                    userName:username,
                    token:'success',
                    user_id:ret.id
                };
                if(req.session.originalUrl){
                    var redirectUrl=req.session.originalUrl;
                    req.session.originalUrl=null;
                }else{
                    var redirectUrl='/admin';
                }
                res.send({status:'1',msg:'success',url:redirectUrl});
            }else{
                res.send({status:'0',msg:'用户名或密码错误！',url:null});
            }
        }
    });
});

/**
 * 图片验证码
 * @param req
 * @param res
 * @param next
 */
var CODE='0123456789';
var CODE_LENGTH=6;
var WIDTH=70;
var HEIGHT=20;
router.post('/getCode',function(req , res){
    var code = CODE;
    var length = CODE_LENGTH;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
    }
    // 保存到session
    req.session.code = randomcode;
    // 输出图片
    var p = new captchapng(WIDTH,HEIGHT,parseInt(randomcode)); // width,height,numeric captcha
    p.color(parseInt(Math.random()*255), parseInt(Math.random()*255), parseInt(Math.random()*255), parseInt(Math.random()*255));  // First color: background (red, green, blue, alpha)
    p.color(parseInt(Math.random()*255), parseInt(Math.random()*255), parseInt(Math.random()*255), parseInt(Math.random()*255)); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.send({code:imgbase64.toString('base64')});
});
module.exports = router;