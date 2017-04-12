/**
 * Created by zhangyong on 2017/03/08.
 */
$sql={
    SPORTS:'SELECT ROUND(AVG(walk_step),0)avg_step,ROUND(AVG(calorie),0)avg_calorie, FROM_UNIXTIME(unix_timestamp(update_time),?)sv_time from tb_life_msg WHERE update_time>=? AND update_time<? AND user_id =? GROUP BY sv_time',
    BLOOD:'SELECT ROUND(AVG(high_pressure),0)avg_high_pressure,ROUND(AVG(low_pressure),0)avg_low_pressure, FROM_UNIXTIME(unix_timestamp(survey_time),?)sv_time from tb_blood_pressure WHERE survey_time>=? AND survey_time<? AND user_id =? GROUP BY sv_time',
    HEART_RATE:'SELECT ROUND(AVG(heart_rate),0)avg_heart_rate, FROM_UNIXTIME(unix_timestamp(survey_time),?)sv_time from tb_blood_pressure WHERE survey_time>=? AND survey_time<? AND user_id =? GROUP BY sv_time',
    ST_TYPE:function(type){
        switch(type){
            case 'Month':
                return '%Y-%m';
            case 'Day':
                return '%Y-%m-%d';
            case 'Hour':
                return '%Y-%m-%d %H';
        }
    }
};
module.exports = $sql;