/**
 * Created by zhangyong on 2017/03/02.
 */
var express = require('express'),
    manage = require('../../models/admin/manage.js'),
    body = require('../../models/admin/body.js'),
    healthy = require('../../models/admin/healthy.js'),
    life = require('../../models/admin/life.js'),
    router = express.Router();
router.get('/main',function(req,res){
    var user_id = req.session.user.user_id;
    req.id = req.session.user.user_id;
    if(user_id&&user_id == 1){
        res.render('admin/main');
    }else{
        if(user_id&&user_id!=''){
            manage.getUser(req,function(err,result){
                if(err||result.length<=0){
                    res.render('common/error');
                }else{
                    res.render('admin/user',{user:result[0]});
                }
            });
        }else{
            res.render('common/error');
        }
    }

});
router.get('/importance',function(req,res){
    res.render('admin/importance');
});
router.get('/body',function(req,res){
    var user_id = req.session.user.user_id;
    console.log("======:"+req.query.user_id);
    if(req.query.user_id&&req.query.user_id!=""){
        req.id = req.query.user_id;
    }else{
        req.id = user_id;
    }
    if(user_id&&user_id == 1){
        body.getBodyAll(function(err,result){
            if(err){
                res.render('common/error');
            }else{
                res.render('admin/body',{body:result});
            }
        });
    }else{
        if(user_id&&user_id!=''){
            body.getBody(req,function(err,result){
                if(err){
                    res.render('common/error');
                }else{
                    res.render('admin/body',{body:result});
                }
            });
        }else{
            res.render('common/error');
        }
    }
});
router.post('/freshBody',function(req,res){
    body.getBody(req.body,function(err,result){
        if(err){
            res.send({"error":'ERR'});
        }else{
            res.send(result);
        }
    });
});
router.post('/updateBody',function(req,res){
    body.updateBody(req.body,function(err,result){
        if(err){
            res.send({"error":'ERR'});
        }else{
            res.send(result);
        }
    });
});
router.get('/healthy',function(req,res){
    res.render('admin/healthy');
});
router.post('/getBloodAll',function(req,res){
    var user_id = req.session.user.user_id;
    var tmp = {
        "draw": req.body.draw,
        "recordsTotal": 0,
        "recordsFiltered": 0,
        "data": []
    }
    healthy.getBloodAll(req.body,user_id,function(err,result){
        if(err){
            res.send(tmp);
        }else{
            res.send(result);
        }
    });
});
router.post('/getUsers',function(req,res){
    req.body.id = req.session.user.user_id;
    healthy.getUserAll(req.body,function(err,result){
        if(err){
            res.send({error:'暂无数据！'});
        }else{
            res.send(result);
        }
    });
});
router.post('/addBlood',function(req,res){
    healthy.addBlood(req.body,function(err,result){
        if(err){
            res.send({"error":"ERR"});
        }else{
            res.send(result);
        }
    });
});
router.post('/updateBlood',function(req,res){
    healthy.updateBlood(req.body,function(err,result){
        if(err){
            res.send({"error":"ERR"});
        }else{
            res.send(result);
        }
    });
});
router.post('/deleteBlood',function(req,res){
    healthy.deleteBlood(req.body,function(err,result){
        if(err){
            res.send({"error":"ERR"});
        }else{
            res.send(result);
        }
    });
});
router.get('/life',function(req,res){
    res.render('admin/life');
});
router.post('/getLifeAll',function(req,res){
    var user_id = req.session.user.user_id;
    var tmp = {
        "draw": req.body.draw,
        "recordsTotal": 0,
        "recordsFiltered": 0,
        "data": []
    }
    life.getLifeAll(req.body,user_id,function(err,result){
        if(err){
            res.send(tmp);
        }else{
            res.send(result);
        }
    });
});
router.post('/addLife',function(req,res){
    life.addLife(req.body,function(err,result){
        if(err){
            res.send({"error":"ERR"});
        }else{
            res.send(result);
        }
    });
});
router.post('/updateLife',function(req,res){
    life.updateLife(req.body,function(err,result){
        if(err){
            res.send({"error":"ERR"});
        }else{
            res.send(result);
        }
    });
});
router.post('/deleteLife',function(req,res){
    life.deleteLife(req.body,function(err,result){
        if(err){
            res.send({"error":"ERR"});
        }else{
            res.send(result);
        }
    });
});
router.get('/sportChart',function(req,res){
    res.render('admin/sportChart');
});
router.get('/bloodPressureChart',function(req,res){
    res.render('admin/bloodPressureChart');
});
router.get('/heartChart',function(req,res){
    res.render('admin/heartChart');
});
router.get('/photo',function(req,res){
    res.render('admin/photo');
});
router.get('/video',function(req,res){
    res.render('admin/video');
});
router.get('/uploadPhoto',function(req,res){
    res.render('admin/uploadPhoto');
});
router.get('/uploadVideo',function(req,res){
    res.render('admin/uploadVideo');
});
router.get('/uploadMedicalHistory',function(req,res){
    res.render('admin/uploadMedicalHistory');
});
module.exports = router;