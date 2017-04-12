/**
 * Created by zhangyong on 2017/03/02.
 */
var config = require('./config');
exports.filter = function filter(req,res,next){
    var whitelist=config.WHITEPATH;
    var blacklist=config.BLACKPATH;
    var arr=req.url.split('/');
    var url=req.url;
    url=url.split('?')[0];
    console.log('=='+url);
    if(config.htmlRgExp.test(url)){
        res.render('common/error');
        return;
    }
    if(config.fileRgExp.test(url)){
        next();
        return;
    }
    if((req.session.user&&url.indexOf('admin')!=-1)||(req.session.users&&url.indexOf('front')!=-1)){
        console.log(true);
        console.log(req.url);
        next();
    }else{
        for(var i= 0,length=arr.length;i<length;i++){
            arr[i]=arr[i].split('?')[0];
        }
        if(whitelist.indexOf(url)!=-1){
            console.log("white");
            next();
        }else if(blacklist.indexOf(url)!=-1){
            console.log("black");
            if(arr.length>2&&arr[1]=='admin'){
                req.session.originalUrl=req.originalUrl?req.originalUrl:null;
                res.redirect('/admin/login');
            }else if(arr.length>2&&arr[1]=='front'){
                req.session.originalUrl=req.originalUrl?req.originalUrl:null;
                res.redirect('/front/login');
            }
        }else{
            res.render('common/error');
        }
    }
};