/**
 * Created by zhangyong on 2016/10/10.
 */
var nodemailer = require('nodemailer');
var USER={
    ACCOUNT:'526379721@qq.com',
    PWD:'nnsdhbokihrabijj'
};
var transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: USER.ACCOUNT,
        //设置的smtp密码
        pass: USER.PWD
    }
});
// send mail with defined transport object
module.exports={
    mailOptions:{
        from: USER.ACCOUNT, // 发件地址
        to: '', // 收件列表
        subject: '', // 标题
        html: '', // 内容
    },
    clearOptions:function(mailOptions){
        mailOptions.from=USER.ACCOUNT; // 发件地址
        mailOptions.to= '';// 收件列表
        mailOptions.subject= ''; // 标题
        mailOptions.html= ''; // 内容
    },
    sendEmail:function(mailOptions,callback){
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('Error: ' + error);
                callback(error,null);
            }else{
                console.log('Message sent: ' + info.response);
                callback(null,info.response);
            }
        });
    },
    getHTML:function(option){
        var html='<div style="line-height:40px;height:40px;">&nbsp;</div>'
            +'<p style="margin:0px;padding:0px;">'
            +'<strong style="font-size:14px;line-height:30px;color:#333333;font-family:arial,sans-serif;">'
            +'亲爱的用户：'
            +'</strong>'
            +'</p>'
            +'<div style="line-height:20px;height:20px;">&nbsp;</div>'
            +'<p style="margin:0px;padding:0px;line-height:30px;font-size:14px;color:#333333;font-family:\'微软雅黑\',arial,sans-serif;">'
            +'您好！感谢您使用积分服务，'+option.title
            +'<b style="font-size:22px;color:#ff9900">'+option.content1+'</b>'
            +'<b style="font-size:22px;color:#ff9900">'+option.content2+'</b>'
            +'</p>'
            +'<p style="margin:0px;padding:0px;line-height:30px;font-size:14px;color:#333333;font-family:\'微软雅黑\',arial,sans-serif;">'
            +'<span style="margin:0px;padding:0px;margin-left:10px;line-height:30px;font-size:14px;color:#979797;font-family:\'微软雅黑\',arial,sans-serif;">'
            +'('+option.teamMsg+'<a href="http://localhost:3003/front/login">立即前往</a>)'
            +'</span>'
            +'</p>'
            +'<div style="line-height:80px;height:80px;">&nbsp;</div>'
            +'<p style="margin:0px;padding:0px;line-height:30px;font-size:14px;color:#333333;font-family:\'微软雅黑\',arial,sans-serif;">'
            +'<a href="http://localhost:3003/">'+option.company+'</a>'
            +'</p>'
            +'<p style="margin:0px;padding:0px;line-height:30px;font-size:14px;color:#333333;font-family:\'微软雅黑\',arial,sans-serif;">'
            +option.time
            +'</p>'
            +'<div style="line-height:20px;height:20px;">&nbsp;</div>';
        return html;
    }
};
