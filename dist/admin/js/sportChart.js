/**
 * Created by zhangyong on 2017/03/08.
 */
var option;
var option1;
$(function () {
    getUsers();
    setTimeout(function(){
        $("#btn_ct_week").trigger('click');
    },200);
    $("#zxt").click(function(){
        $(this).addClass('active');
        $(this).css('color','#fff');
        $("#zzt").removeClass('active');
        $("#zzt").css("color","#382C2D");
        $("#type_chart").val('spline');
        getSportDatas();
    });
    $("#zzt").click(function(){
        $(this).addClass('active');
        $(this).css('color','#fff');
        $("#zxt").removeClass('active');
        $("#zxt").css("color","#382C2D");
        $("#type_chart").val('column');
        getSportDatas();
    });
    $(".portlet-title").find('input').each(function(){
        $(this).click(function(){
            $(this).siblings().addClass('sel_input');
            $(this).removeClass('sel_input');
            var obj_id = $(this).attr('id');
            var start_time = "";
            var end_time = "";
            var current_time = new Date().pattern('yyyy-MM-dd HH:mm:ss');
            switch (obj_id){
                case 'btn_ct_week':
                    start_time = GetDateStr(-7);
                    end_time = current_time;
                    $("#type").find("[name='day']").attr("selected",true);
                    break;
                case 'btn_ct_month':
                    start_time = GetDateStr(-30);
                    end_time = current_time;
                    $("#type").find("[name='day']").attr("selected",true);
                    break;
                case 'btn_ct_halfyear':
                    start_time = GetDateStr(-180);
                    end_time = current_time;
                    $("#type").find("[name='month']").attr("selected",true);
                    break;
                case 'btn_ct_all':
                    start_time = GetDateStr(-365);
                    end_time = current_time;
                    $("#type").find("[name='month']").attr("selected",true);
                    break;
                case 'btn_ct_day':
                    start_time = GetDateStr(0);
                    end_time = current_time;
                    $("#type").find("[name='day']").attr("selected",true);
                    break;
            }
            $("#start_time").val(start_time);
            $("#end_time").val(end_time);
            $("#btn_tj_state").trigger('click');
        });
    });
    $("#btn_tj_state").click(function(){
        getSportDatas();
    });
    option1={
        chart: {
            type: 'column',
            zoomType: 'xy',
            panning:true,
            pinchType:'x',
            panKey:'ctrl'
        },
        title: {
            text: '运动量趋势图',
            style:{
                fontFamily:'微软雅黑',
                fontSize:'14px',
            }
        },
        subtitle: {
            text: '数据来源:个人',
            style:{
                fontFamily:'微软雅黑'
            }
        },
        xAxis: {
            categories: [
                '暂无数据'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '运动量[步数|卡路里]'
            }
        },
        tooltip: {
            shared:true,
            valueSuffix:'',
            backgroundColor: {
                linearGradient: [0, 0, 0, 60],
                stops: [
                    [0, '#6B688F'],
                    [1, '#5B7AA1']
                ]
            },
            borderRadius:5,
            borderWidth: 1,
            borderColor: '#5B7AA1',
            style:{
                fontSize: '14px',
                padding: '8px',
                color:'#ffffff',
                fontFamily:'微软雅黑'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '平均步数（/Steps）',
            color:'#4BCB5F',
            data: [0]
        },{
            name: '平均消耗热量（/Cal）',
            color:'#EB5B11',
            data: [0]
        }]
    };
    option={
        chart: {
            type: 'column',
            zoomType: 'xy',
            panning:true,
            pinchType:'x',
            panKey:'ctrl'
        },
        title: {
            text: '运动量趋势图',
            style:{
                fontFamily:'微软雅黑',
                fontSize:'14px',
            }
        },
        subtitle: {
            text: '数据来源:个人',
            style:{
                fontFamily:'微软雅黑',
            }
        },
        xAxis: {
            categories: [
                '暂无数据'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '运动量[步数|卡路里]'
            }
        },
        tooltip: {
            shared:true,
            valueSuffix:'',
            backgroundColor: {
                linearGradient: [0, 0, 0, 60],
                stops: [
                    [0, '#6B688F'],
                    [1, '#5B7AA1']
                ]
            },
            borderRadius:5,
            borderWidth: 1,
            borderColor: '#5B7AA1',
            style:{
                fontSize: '14px',
                padding: '8px',
                color:'#ffffff',
                fontFamily:'微软雅黑'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 1
            }
        },
        series: [{
            name: '平均步数（/Steps）',
            color:'#4BCB5F',
            data: [0]
        },{
            name: '平均消耗热量（/Cal）',
            color:'#EB5B11',
            data: [0]
        }]
    };
    $('#GraphImg').highcharts(option1);
});

//获取统计数据
function getSportDatas(){
    $.ajax({
        url:'/admin/statistic/getSportDatas',
        type:'POST',
        data:$("#search_tj").serialize(),
        dataType:'JSON',
        success:function(result){
            if(result.error||result.length<=0){
                $('#GraphImg').highcharts(option1);
            }else{
                var chart_type = $("#type_chart").val();
                var real_name = $("#user_id option:selected").text();
                var series = [];
                var steps = [];
                var calories = [];
                for(var i=0;i<result.length;i++){
                    var data = result[i];
                    series.push(data.sv_time);
                    steps.push(data.avg_step);
                    calories.push(data.avg_calorie);
                }
                option.chart.type = chart_type;
                option.subtitle.text = "数据来源：["+real_name+"]";
                option.xAxis.categories = series;
                option.series[0].data = steps;
                option.series[1].data = calories;
                $('#GraphImg').highcharts(option);
            }
        }

    });
}

function getUsers(){
    $.ajax({
        url:'/admin/src/getUsers',
        type:'POST',
        dataType:'',
        success:function(result){
            $("#user_id").empty();
            if(result&&result.length>0){
                for(var i=0;i<result.length;i++){
                    if(result[i].id!=1){
                        $("#user_id").append('<option value="'+result[i].id+'">'+result[i].real_name+'</option>');
                    }
                }
            }
        }
    });
}