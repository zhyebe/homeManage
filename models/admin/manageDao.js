/**
 * Created by zhangyong on 2016/10/18.
 */
$sql={
    GET_ALL:'select id,msg_name,msg_pwd,FROM_UNIXTIME(UNIX_TIMESTAMP(update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_message limit ?,?',
    GET_ALL_COUNT:'select count(1)sum from tb_message where 1 = ?',
    GET:'select id,msg_name,msg_pwd,FROM_UNIXTIME(UNIX_TIMESTAMP(update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_message where user_id=? limit ?,?',
    COUNT:'select count(1)sum from tb_message where user_id=?',
    ADD:'insert into tb_message(user_id,msg_name,msg_pwd,update_time)values(?,?,?,?)',
    UPDATE:'update tb_message set msg_name=?,msg_pwd=?,update_time=? where id=?',
    DELETE:'delete from tb_message where id=?',

    GET_USER_ALL:'select id,username,password,FROM_UNIXTIME(UNIX_TIMESTAMP(birthday),"%Y-%m-%d")birthday,age,real_name,head_url,FROM_UNIXTIME(UNIX_TIMESTAMP(update_time),"%Y-%m-%d %H:%i:%s")update_time  from tb_admin_user limit ?,?',
    GET_USER_ALL_COUNT:'select count(1)sum from tb_admin_user',
    GET_USER:'select id,username,password,FROM_UNIXTIME(UNIX_TIMESTAMP(birthday),"%Y-%m-%d")birthday,age,real_name,head_url,FROM_UNIXTIME(UNIX_TIMESTAMP(update_time),"%Y-%m-%d %H:%i:%s")update_time from tb_admin_user where id=?',
    UPDATE_USERS:'update tb_admin_user set username=?,password=?,birthday=?,age=?,real_name=?,head_url=?,update_time=? where id=?',
    UPDATE_USER:'update tb_admin_user set birthday=?,age=?,real_name=?,head_url=?,update_time=? where id=?',
    ADD_USER:'insert into tb_admin_user(username,password,birthday,age,real_name,head_url,update_time)values(?,?,?,?,?,?,?)',
    DELETE_USER:'delete from tb_admin_user where id=?',
    UPDATE_PWD:'update tb_admin_user set password=? where id=?'
};
module.exports=$sql;