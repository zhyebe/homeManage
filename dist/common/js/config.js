/**
 * Created by zhangyong on 2016/10/11.
 */
var CONFIG={
    QQ:'526379721',
    EMAIL:'zhyebe@126.com',
    ENTERKEY:13,
    QQURL:'http://wpa.qq.com/msgrd?v=3&uin=526379721&site=qq&menu=yes',
    QQTEXT:'QQ在线客服',
    EMAILURL:'mailto:zhyebe@126.com',
    ADDRESS:'北京路345号A座3楼405',
    PHONE:'0871-59188888'
};
function uploadImgFunc(inputFileID) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        var files = $("#" + inputFileID)[0].files;
        if (files.length > 0) {
            formData.append("file", files[0]);
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/upload/uploadImg',
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    resolve(data);
                },
                error: function () {
                    resolve(JSON.parse('{"code": "-2", "msg": "上传错误！"}'));
                }
            });
        }
        else {
            resolve(JSON.parse('{"code": "1", "msg": ""}'));
        }
    });
};

function uploadFileFunc(inputFileID) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        var files = $("#" + inputFileID)[0].files;
        if (files.length > 0) {
            formData.append("file", files[0]);
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/upload/uploadFile',
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    resolve(data);
                },
                error: function () {
                    resolve(JSON.parse('{"code": "-2", "msg": "上传错误！"}'));
                }
            });
        }
        else {
            resolve(JSON.parse('{"code": "1", "msg": ""}'));
        }
    });
};