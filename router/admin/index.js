/**
 * Created by zhangyong on 2016/07/23.
 */
var express = require('express'),
    manage = require('../../models/admin/manage.js'),
    router = express.Router();
router.get('/', function(req, res) {
    var user ={
        user_name:req.session.user.userName,
        level:(req.session.user.user_id==1)?'管理用户':'个人用户',
        greeting:getGreeting()
    };
    res.render('admin/home',{user:user});
});
router.get('/index', function(req, res) {
    console.log("start1");
    var user ={
        user_name:req.session.user.userName,
        level:(req.session.user.user_id==1)?'管理员用户':'个人用户',
        greeting:getGreeting()
    };
    res.render('admin/home',{user:user});
});
router.get('/logout', function(req, res) {
    req.session.user=null;
    req.session.code=null;
    res.redirect('/admin/login');
});
router.post('/getUsers', function(req, res) {
    var tmp = {
        "draw": req.body.draw,
        "recordsTotal": 0,
        "recordsFiltered": 0,
        "data": []
    }
    manage.getUsers(req.body,function(err,result){
        if(err){
            res.send(tmp);
        }else{
            res.send(result);
        }
    });
});
router.post('/getUser', function(req, res) {
    req.body.id = req.session.user.user_id;
    manage.getUser(req.body,function(err,result){
        if(err){
            res.send({error:'暂无数据！'});
        }else{
            res.send(result);
        }
    });
});
router.post('/addUser', function(req, res) {
    manage.addUser(req.body,function(err,result){
        if(err){
            res.send({error:'Err'});
        }else{
            res.send(result);
        }
    });
});
router.post('/updateUser', function(req, res) {
    manage.updateUser(req.body,function(err,result){
        if(err){
            res.send({error:'Err'});
        }else{
            res.send(result);
        }
    });
});
router.post('/updateUsers', function(req, res) {
    manage.updateUsers(req.body,function(err,result){
        if(err){
            res.send({error:'Err'});
        }else{
            res.send(result);
        }
    });
});
router.post('/updatePwd', function(req, res) {
    manage.updatePwd(req.body,function(err,result){
        if(err){
            res.send({error:'Err'});
        }else{
            res.send(result);
        }
    });
});
router.post('/deleteUser', function(req, res) {
    manage.deleteUser(req.body,function(err,result){
        if(err){
            res.send({error:'Err'});
        }else{
            res.send(result);
        }
    });
});

router.post('/getMessages', function(req, res) {
    var tmp = {
        "draw": req.body.draw,
        "recordsTotal": 0,
        "recordsFiltered": 0,
        "data": []
    }
    var whereData = JSON.parse(req.body.extra_search);
    var user_id = null;
    if(whereData.user_id == ""&&req.session.user){
        user_id = req.session.user.user_id;
        manage.getMessages(req.body,user_id,function(err,result){
            if(err){
                res.send(tmp);
            }else{
                res.send(result);
            }
        });
    }else{
        res.send(tmp);
        return;
    }
});
router.post('/addMsg', function(req, res) {
    req.body.user_id = req.session.user.user_id;
    manage.addMsg(req.body,function(err,result){
        if(err){
            res.send({error:'Error!'});
        }else{
            res.send({success:'Success!'});
        }
    });
});
router.post('/saveMsg', function(req, res) {
    manage.saveMsg(req.body,function(err,result){
        if(err){
            res.send({error:'Error!'});
        }else{
            res.send({success:'Success!'});
        }
    });
});
router.post('/deleteMsg', function(req, res) {
    manage.deleteMsg(req.body,function(err,result){
        if(err){
            res.send({error:'Error!'});
        }else{
            res.send({success:'Success!'});
        }
    });
});
function getGreeting(){
    var now = new Date(),
        hour = now.getHours();
    if(hour < 6){
        return "凌晨好";
    }
    else if (hour < 9){
        return "早上好";
    }
    else if (hour < 12){
        return "上午好";
    }
    else if (hour < 14){
        return "中午好";
    }
    else if (hour < 17) {
        return "下午好";
    }else if (hour < 19){
        return "傍晚好";
    }
    else if (hour < 22){
        return "晚上好";
    }
    else {
        return "夜里好";
    }
}
module.exports = router;