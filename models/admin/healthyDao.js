/**
 * Created by zhangyong on 2017/03/07.
 */
$sql={
    GET_ALL_HEALTHY_COUNT:'select count(1)sum from tb_blood_pressure a,tb_admin_user b where a.user_id= b.id and 1=?',
    GET_ALL_HEALTHY:'select a.id id,b.id user_id,b.real_name,a.high_pressure,a.low_pressure,a.heart_rate,a.body_tmp,a.heart_unit,a.pressure_unit,from_unixtime(unix_timestamp(a.survey_time),"%Y-%m-%d %H:%i:%s")survey_time,' +
    'from_unixtime(unix_timestamp(a.update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_blood_pressure a,tb_admin_user b where a.user_id= b.id limit ?,?',
    GET_HEALTHY_COUNT:'select count(1)sum from tb_blood_pressure where user_id=?',
    GET_HEALTHY:'select a.id,a.user_id,b.real_name,a.high_pressure,a.low_pressure,a.heart_rate,a.body_tmp,a.heart_unit,a.pressure_unit,from_unixtime(unix_timestamp(a.survey_time),"%Y-%m-%d %H:%i:%s")survey_time,' +
    'from_unixtime(unix_timestamp(a.update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_blood_pressure a,tb_admin_user b where a.user_id=b.id and a.user_id=? limit ?,?',
    GET_USER:'select * from tb_admin_user where id=?',
    GET_USER_ALL:'select * from tb_admin_user where 1=?',
    UPDATE_HEALTHY:'update tb_blood_pressure set user_id=?,high_pressure=?,low_pressure=?,heart_rate=?,body_tmp=?,survey_time=?,update_time=? where id=?',
    DELETE_HEALTHY:'delete from tb_blood_pressure where id=?',
    ADD_HEALTHY:'insert into tb_blood_pressure(user_id,high_pressure,low_pressure,heart_rate,body_tmp,survey_time,update_time)values(?,?,?,?,?,?,?)'
};
module.exports = $sql;