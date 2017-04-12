/**
 * Created by zhangyong on 2017/03/07.
 */
$sql = {
    GET_LIFE_ALL_COUNT:'select count(1)sum from tb_life_msg where 1=?',
    GET_LIFE_ALL:'select a.id,a.user_id,b.real_name,breakfast,' +
    'FROM_UNIXTIME(unix_timestamp(breakfast_time),"%Y-%m-%d %H:%i:%s")breakfast_time,lunch,' +
    'FROM_UNIXTIME(unix_timestamp(lunch_time),"%Y-%m-%d %H:%i:%s")lunch_time,dinner,' +
    'FROM_UNIXTIME(unix_timestamp(dinner_time),"%Y-%m-%d %H:%i:%s")dinner_time,' +
    'FROM_UNIXTIME(unix_timestamp(week_up_time),"%Y-%m-%d %H:%i:%s")week_up_time,' +
    'FROM_UNIXTIME(unix_timestamp(sleep_time),"%Y-%m-%d %H:%i:%s")sleep_time,sleep_long,walk_step,calorie,' +
    'FROM_UNIXTIME(unix_timestamp(a.update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_life_msg a,tb_admin_user b where a.user_id=b.id limit ?,?',
    GET_LIFE_COUNT:'select count(1)sum from tb_life_msg where user_id=?',
    GET_LIFE:'select a.id,a.user_id,b.real_name,breakfast,' +
    'FROM_UNIXTIME(unix_timestamp(breakfast_time),"%Y-%m-%d %H:%i:%s")breakfast_time,lunch,' +
    'FROM_UNIXTIME(unix_timestamp(lunch_time),"%Y-%m-%d %H:%i:%s")lunch_time,dinner,' +
    'FROM_UNIXTIME(unix_timestamp(dinner_time),"%Y-%m-%d %H:%i:%s")dinner_time,' +
    'FROM_UNIXTIME(unix_timestamp(week_up_time),"%Y-%m-%d %H:%i:%s")week_up_time,' +
    'FROM_UNIXTIME(unix_timestamp(sleep_time),"%Y-%m-%d %H:%i:%s")sleep_time,sleep_long,walk_step,calorie,' +
    'FROM_UNIXTIME(unix_timestamp(a.update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_life_msg a,tb_admin_user b where a.user_id=b.id AND user_id=? limit ?,?',
    UPDATE_LIFE:'update tb_life_msg set user_id=?,breakfast=?,breakfast_time=?,lunch=?,lunch_time=?,dinner=?,dinner_time=?,week_up_time=?,sleep_time=?,sleep_long=?,walk_step=?,calorie=?,update_time=? where id=?',
    ADD_LIFE:'insert into tb_life_msg(user_id,breakfast,breakfast_time,lunch,lunch_time,dinner,dinner_time,week_up_time,sleep_time,sleep_long,walk_step,calorie,update_time)' +
    'values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    DELETE_LIFE:'delete from  tb_life_msg'
};
module.exports = $sql;