/**
 * Created by zhangyong on 2016/04/29.
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
/**
 * 获取当前日期前后AddDayCount天的日期
 * @param AddDayCount 负数表示前多少天，正数表示后多少天，0表示当前日期
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d+" 00:00:00";
}
/**
 * 获取当前日期所在月份的最大天数
 */
var maxDayOfDate = function(date)
{
    date = arguments[0] || new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    var time = date.getTime() - 24 * 60 * 60 * 1000;
    var newDate = new Date(time);
    return newDate.getDate();
};
/**
 * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
 *
 */
var strFormatToDate = function(formatStr, dateStr){
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
/**
 * 根据日期：年Y，月M，日D类型和当前数量，返回连续小时、连续月或连续天的数组
 */
var arrayOption=function(type,maxNum){
    var options=[];
    switch (type){
        case 'Y':
            if(maxNum>12){
                maxNum=12;
            }
            for(var i=1;i<=maxNum;i++){
                if(i<10){
                    options[options.length]='0'+i;
                }else{
                    options[options.length]=i;
                }
            }
            break;
        case 'M':
            for(var i=1;i<=maxNum;i++){
                if(i<10){
                    options[options.length]='0'+i;
                }else{
                    options[options.length]=i;
                }
            }
            break;
        case 'D':
            if(maxNum>23){
                maxNum=23
            }
            for(var i=0;i<=maxNum;i++){
                if(i<10){
                    options[options.length]='0'+i+':00';
                }else{
                    options[options.length]=i+':00';
                }
            }
            break;
    }
    return options;
};
function getNextDay(d){
    d = new Date(d);
    d = +d + 1000*60*60*24;
    d = new Date(d);
    //return d;
    //格式化
    return d.pattern('yyyy-MM-dd');

}
//获取范围内随机数
function getRandomNum(max,min){
    return parseInt(Math.random()*(max-min+1)+min,10);
}
function checkPhone(phone){
    if(!(/^1[34578]\d{9}$/.test(phone))){
        return false;
    }else{
        return true;
    }
}
function CheckMail(mail) {
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) {
        return true;
    }else {
        return false;
    }
}

//格林威治时间字符串转换为本地时间字符串
function ISODateStrToLocalDateStr(ISODateStr){
    var ISODate=strFormatToDate('yyyy-MM-dd HH:mm:ss',ISODateStr.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''));
    ISODate.setHours(ISODate.getHours()+8);
    var LocalDateStr=ISODate.pattern('yyyy-MM-dd HH:mm:ss');
    return LocalDateStr;
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function sortLeftArry(arry){
    var a= arry[0];
    for(var i=0;i< arry.length;i++){
        arry[i] = arry[i+1];
    }
    arry[arry.length-1] = a;
    return arry;
}
function sortRightArry(arry){
    var a= arry[arry.length-1];
    for(var i=arry.length-1;i>=0;i--){
        arry[i] = arry[i-1];
    }
    arry[0] = a;
    return arry;
}