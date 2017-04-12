/**
 * Created by zhangyong on 2017/03/06.
 */
$sql={
    GET_BODY_ALL:'SELECT id,user_id,height,weight,cm_unit,weight_unit,chest_size,waist_size,hip_size,vital_capacity,ml_unit,eye_sight,FROM_UNIXTIME(UNIX_TIMESTAMP(survey_time),"%Y-%m-%d %H:%i:%s")survey_time,FROM_UNIXTIME(UNIX_TIMESTAMP(update_time),"%Y-%m-%d %H:%i:%s")update_time ' +
    'FROM tb_body_msg',
    GET_BODY:'SELECT id,user_id,height,weight,cm_unit,weight_unit,chest_size,waist_size,hip_size,vital_capacity,ml_unit,eye_sight,FROM_UNIXTIME(UNIX_TIMESTAMP(survey_time),"%Y-%m-%d %H:%i:%s")survey_time,FROM_UNIXTIME(UNIX_TIMESTAMP(update_time),"%Y-%m-%d %H:%i:%s")update_time ' +
    'FROM tb_body_msg WHERE user_id=?',
    GET_USER:'select * from tb_admin_user where id=?',
    GET_ALL_USER:'select * from tb_admin_user',
    UPDATE_BODY:'update tb_body_msg set user_id=?,height=?,weight=?,chest_size=?,waist_size=?,hip_size=?,vital_capacity=?,eye_sight=?,survey_time=?,update_time=? where id=?',
    DELETE_BODY:'delete from tb_body_msg where id=?',
    ADD_BODY:'insert into tb_body_msg(user_id,height,weight,chest_size,waist_size,hip_size,vital_capacity,eye_sight,survey_time,update_time)values(?,?,?,?,?,?,?,?,?,?)'
};
module.exports=$sql;