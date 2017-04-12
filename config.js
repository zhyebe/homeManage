/**
 * Created by IThink on 2016/1/9.
 */


module.exports = {
    MediaConfig: {
        nodeid: '000000001001',
        nodeaddr: 'tcp://53.28.100.5:12003',
        hostip: '127.0.0.1',
        webPort: 3006
    },

    mysql: {
        host     : '192.168.1.233',
        user     : '5fec19ba692c4',
        password : '62d5992dff834',
        port: '30084',
        database: '5fec19ba692c4',
    },
    ROUTER_URL:[
        {routerKey:'/',routerValue:'./router/index'},
        {routerKey:'/admin',routerValue:'./router/admin/index'},
        {routerKey:'/admin/login',routerValue:'./router/admin/login'},
        {routerKey:'/upload',routerValue:'./router/upload/upload'},
        {routerKey:'/admin/src',routerValue:'./router/admin/src'},
        {routerKey:'/admin/statistic',routerValue:'./router/admin/statistic'},
        {routerKey:'/admin/media',routerValue:'./router/admin/media'},
    ],
    WHITEPATH:[
        '/',
        '/admin/login/getCode',
        '/admin/login',
        '/admin/login/toLogin',
        '/admin/logout',
        '/upload/uploadFile',
        '/upload/uploadImg',
        '/upload/uploadVideo',
        '/upload/saveImg',
    ],
    BLACKPATH:[
        '/admin/',
        '/admin/index',
        '/admin/center',
    ],
    STATICCONFIG:{
        EMAIL:'zhyebe@126.com',
    },
    htmlRgExp : /\.html$/,
    fileRgExp : /\.js|\.css|\.acc|\.png|\.ico|\.jpg|\.jpeg|\.mp4|\.mp3|\.gif|\.json|\.pdf|\.svg|\.swf|\.tiff|\.txt|\.wav|\.wma|\.wmv|\.xml|\.md|\.less|\.otf|\.eot|\.woff|\.woff2|\.scss|\.coffee$/,
    calculateCal:function(step){
        var cal = 20;
        var calorie = Math.ceil(step/cal);
        return calorie;
    },
    sleepLong:function(start,end){
        var startTime = module.exports.strFormatToDate('yyyy-MM-dd HH:mm:ss',start).getTime();
        var endTime = module.exports.strFormatToDate('yyyy-MM-dd HH:mm:ss',end).getTime();
        var long = endTime - startTime;
        var hours=Math.floor(long/(3600*1000));
        return hours;
    },
    strFormatToDate :function(formatStr, dateStr){
        var year = 0;
        var start = -1;
        var len = dateStr.length;
        if((start = formatStr.indexOf('yyyy')) > -1 && start < len){
            year = dateStr.substr(start, 4);
        }
        var month = 0;
        if((start = formatStr.indexOf('MM')) > -1  && start < len){
            month = parseInt(dateStr.substr(start, 2)) - 1;
        }
        var day = 0;
        if((start = formatStr.indexOf('dd')) > -1 && start < len){
            day = parseInt(dateStr.substr(start, 2));
        }
        var hour = 0;
        if( ((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len){
            hour = parseInt(dateStr.substr(start, 2));
        }
        var minute = 0;
        if((start = formatStr.indexOf('mm')) > -1  && start < len){
            minute = dateStr.substr(start, 2);
        }
        var second = 0;
        if((start = formatStr.indexOf('ss')) > -1  && start < len){
            second = dateStr.substr(start, 2);
        }
        return new Date(year, month, day, hour, minute, second);
    }
}
