/**
 * Created by zhangyong on 2017/03/06.
 */
$(function(){
    $("#user_id").change(function(){
        var user_id = $(this).val();
        $.ajax({
            url:'/admin/src/freshBody',
            type:'post',
            data:{id:user_id},
            dataType:'JSON',
            success:function(result){
                if(result.error){
                    openMsgLayer('获取信息失败！')
                }else{
                    var body = result;
                    var updateTime = body.update_time;
                    $("#code_no").val(body.id);
                    $("#height").val(body.height+body.cm_unit);
                    $("#weight").val(body.weight+body.weight_unit);
                    $("#chest_size").val(body.chest_size+body.cm_unit);
                    $("#waist_size").val(body.waist_size+body.cm_unit);
                    $("#hip_size").val(body.hip_size+body.cm_unit);
                    $("#vital_capacity").val(body.vital_capacity+body.ml_unit);
                    $("#eye_sight").val(body.eye_sight);
                    $("#survey_time").val(body.survey_time);
                    if(updateTime&&updateTime!=""){
                        $("#update_time").val(body.update_time);
                    }else{
                        updateTime = new Date().pattern('yyyy-MM-dd HH:mm:ss');
                        $("#update_time").val(updateTime);
                    }
                }
            }
        });
    });

    $(".no-active").attr('disabled',true);
    $("#edit_body").click(function(){
        $(".no-active").attr('disabled',false);
        $(this).parent().addClass('ctrl-active');
        $("#save_body").parent().removeClass('ctrl-active');
        $("#edit_cancel").parent().removeClass('ctrl-active');
        $("#update_time").val(new Date().pattern('yyyy-MM-dd HH:mm:ss'));
    });
    $("#save_body").click(function(){
        var index=openConfirmLayer('<p>是否要修改此信息?</p><p style="color: red;">[注意：修改后将不可撤回！]</p>','修改','取消',function(){
            saveBody();
            closeAlertLayer(index);
        },function(){
            closeAlertLayer(index);
        });
    });
});

function saveBody(){
    var bodayData = $("#body_form").serialize();
    $.ajax({
        url:'/admin/src/updateBody',
        type:'POST',
        data:bodayData,
        dataType:'JSON',
        success:function(result){
            if(result.error){
                openMsgLayer('保存信息失败！');
            }else{
                $("#edit_body").parent().removeClass('ctrl-active');
                $("#save_body").parent().addClass('ctrl-active');
                $("#edit_cancel").parent().addClass('ctrl-active');
                $(".no-active").attr('disabled',true);
                openMsgLayer('保存信息成功！');
                window.location.href = '/admin/src/body';
            }
        }
    });
}