/**
 * Created by zhangyong on 2017/03/08.
 */
var express = require('express'),
    statistic = require('../../models/admin/statistic.js'),
    router = express.Router();

router.post('/getHeartDatas',function(req,res){
    statistic.getHeartDatas(req.body,function(err,result){
        if(err){
            res.send({error:'ERR'});
        }else{
            res.send(result);
        }
    });
});
router.post('/getBloodPressureDatas',function(req,res){
    statistic.getBloodPressureDatas(req.body,function(err,result){
        if(err){
            res.send({error:'ERR'});
        }else{
            res.send(result);
        }
    });
});
router.post('/getSportDatas',function(req,res){
    statistic.getSportDatas(req.body,function(err,result){
        if(err){
            res.send({error:'ERR'});
        }else{
            res.send(result);
        }
    });
});
module.exports = router;