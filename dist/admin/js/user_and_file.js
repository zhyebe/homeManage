/**
 * Created by zhangyong on 2017/03/04.
 */
window.onload = function(){
    var fileUploader = document.getElementById('FileUploader');
    var pathDisplayer = document.getElementById('PathDisplayer');
    if(fileUploader.addEventListener){
        fileUploader.addEventListener('change', fileUploaderChangeHandler, false);
    }else if(fileUploader.attachEvent){
        fileUploader.attachEvent('onclick', fileUploaderClickHandler);
    }else{
        fileUploader.onchange = fileUploaderChangeHandler;
    }
    function fileUploaderChangeHandler(){
        uploadImgFunc("FileUploader",function(data){
            if(data){
                var img = data.filePath + data.msg[0];
                $("#head_img").attr("src",img);
                $("#PathDisplayer").val(img);
            }
        });
    }
    function fileUploaderClickHandler(){
        setTimeout(function(){
            fileUploaderChangeHandler();
        }, 0);
    }
    $("#update_time").val(new Date().pattern('yyyy-MM-dd HH:mm:ss'));
    $(".no-active").each(function(){
        $(this).attr("disabled","disabled");
    });
    $("#first_group_headimg").viewer();
    $("#edit_user").click(function(){
        $(".no-active").removeAttr("disabled");
        $(this).parent().addClass("ctrl-active");
        $("#save_user").parent().removeClass("ctrl-active");
        $("#edit_cancel").parent().removeClass("ctrl-active");
    });
    $("#save_user").click(function(){
        $(".no-active").each(function(){
            $(this).attr("disabled","disabled");
        });
        $("#edit_user").parent().removeClass("ctrl-active");
        $("#save_user").parent().addClass("ctrl-active");
        $("#edit_cancel").parent().addClass("ctrl-active");
        var index=openConfirmLayer('<p>是否要修改此用户信息?</p><p style="color: red;">[注意：修改后将不可撤回！]</p>','修改','取消',function(){
            update_user();
            closeAlertLayer(index);
        },function(){
            closeAlertLayer(index);
        });
    });
    //修改密码
    $("#edit_pwd").click(function(){
        $(this).parent().addClass("ctrl-active");
        $("#save_pwd").parent().removeClass("ctrl-active");
        $("#pwd_cancel").parent().removeClass("ctrl-active");
        $("#password").removeAttr('disabled');
    });
    $("#save_pwd").click(function(){
        var reg = /^[a-zA-Z0-9]+$/;
        var pwd = $("#password").val();
        if(pwd ==""){
            openMsgLayer('密码不能为空！');
            return;
        }else if(!reg.test(pwd)){
            openMsgLayer('密码只能是数字和字母的组合！');
            return;
        }
        $("#edit_pwd").parent().removeClass("ctrl-active");
        $("#save_pwd").parent().addClass("ctrl-active");
        $("#pwd_cancel").parent().addClass("ctrl-active");
        $("#password").attr('disabled','disabled');
        var index=openConfirmLayer('<p>是否要修改此用户密码?</p><p style="color: red;">[注意：修改后将不可撤回！]</p>','修改','取消',function(){
            update_pwd();
            closeAlertLayer(index);
        },function(){
            closeAlertLayer(index);
        });
    });
};
function update_user(){
    var id = $("#code_no").val();
    var head_url = $("#PathDisplayer").val();
    var real_name = $("#real_name").val();
    var age = $("#age").val();
    var birthday = $("#birthday").val();
    var update_time =$("#update_time").val();
    $.ajax({
        url:'/admin/updateUser',
        type:'POST',
        data:{id:id,head_url:head_url,real_name:real_name,age:age,birthday:birthday,update_time:update_time},
        dataType:'JSON',
        success:function(result){
            if(!result.error){
                openMsgLayer('信息修改成功！');
            }else{
                openMsgLayer('信息修改失败！');
            }
        }
    });
}
function update_pwd(){
    var password = $("#password").val();
    var id = $("#code_no").val();
    $.ajax({
        url:'/admin/updatePwd',
        type:'POST',
        data:{id:id,password:password},
        dataType:'JSON',
        success:function(result){
            if(!result.error){
                openMsgLayer('密码修改成功！');
            }else{
                openMsgLayer('密码修改失败！');
            }
        }
    });
}