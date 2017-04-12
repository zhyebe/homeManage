/**
 * Created by zhangyong on 2017/03/05.
 */
function uploadImgFunc(inputFileID,callback) {
    var current_date = new Date().pattern('yyyy-MM-dd');
    var formData = new FormData();
    var files = $("#" + inputFileID)[0].files;
    if (files.length > 0) {
        for(var i=0;i<files.length; i++){
            formData.append(current_date+"_"+uuid(8,16), files[i]);
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/upload/uploadImg',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.code!=-1){
                    callback(data);
                }else{
                    openMsgLayer('上传失败');
                    callback(null);
                }
            },
            error: function (evt) {
                console.log(evt);
            }
        });
    }
    else {
        openMsgLayer('请选择文件！');
        callback(null);
    }
}
function uploadVideoFunc(inputFileID,callback) {
    var current_date = new Date().pattern('yyyy-MM-dd');
    var formData = new FormData();
    var files = $("#" + inputFileID)[0].files;
    if (files.length > 0) {
        for(var i=0;i<files.length; i++){
            formData.append(current_date+"_"+uuid(8,16), files[i]);
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/upload/uploadVideo',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.code!=-1){
                    callback(data);
                }else{
                    openMsgLayer('上传失败');
                    callback(null);
                }
            },
            error: function (evt) {
                console.log(evt);
            }
        });
    }
    else {
        openMsgLayer('请选择文件！');
        callback(null);
    }
}
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data. At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}