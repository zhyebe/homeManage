/**
 * Created by zhangyong on 2016/10/12.
 */
var moment = require('moment');
exports.dateFormatenl = function (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
exports.dateFormatens = function (date) {
    return moment(date).format('YYYY-MM-DD');
}
exports.dateFormatch = function (date) {
    return moment(date).format('YYYY年MM月DD日');
}
exports.dateFormatchhh = function (date) {
    return moment(date).format('YYYY年MM月DD日HH点');
}