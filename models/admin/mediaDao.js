/**
 * Created by zhangyong on 2017/03/10.
 */
var $sql = {
    GET_PHOTOS:'select id,photo_name from tb_photos',
    GET_PHOTO:'select a.id,img_url,b.cover_page_url,FROM_UNIXTIME(unix_timestamp(a.update_time),"%Y-%m-%d %h:%i:%s")update_time from tb_photo a,tb_photos b where a.photos_id=b.id and b.id=?',
    GET_PHOTO_PAGE:'select id,img_url,FROM_UNIXTIME(unix_timestamp(update_time),"%Y-%m-%d %h:%i:%s")update_time from tb_photo where photos_id=? limit ?,?',
    GET_PHOTO_COUNT:'select count(1)sum from tb_photo where photos_id=?',

    GET_VIDEOS:'select id,video_name,cover_page_url from tb_videos',
    GET_VIDEO:'select a.id,video_url,video_cover,b.cover_page_url,FROM_UNIXTIME(unix_timestamp(a.update_time),"%Y-%m-%d %h:%i:%s")update_time from tb_video a,tb_videos b where a.videos_id=b.id and b.id=?',
    GET_VIDEO_PAGE:'select id,video_url,video_cover,FROM_UNIXTIME(unix_timestamp(update_time),"%Y-%m-%d %h:%i:%s")update_time from tb_video where videos_id=? limit ?,?',
    GET_VIDEO_COUNT:'select count(1)sum from tb_video where videos_id=?',

    GET_PHOTO_ALL:'select a.id,c.photo_name,a.img_url,b.type_desc,FROM_UNIXTIME(unix_timestamp(a.update_time),"%Y-%m-%d %h:%i:%s")update_time from tb_photo a,tb_photo_type b,tb_photos c where a.photos_id=c.id and a.type=b.id limit ?,?',
    GET_PHOTO_ALL_COUNT:'select count(1)sum from tb_photo a,tb_photo_type b,tb_photos c where a.photos_id=c.id and a.type=b.id',
    DELETE_PHOTO:'delete from tb_photo where id=?',

    ADD_PHOTO:'insert into tb_photo(photos_id,img_url,type,update_time)values(?,?,?,?)',
    ADD_PHOTOS:'insert into tb_photos(photo_name,cover_page_url,update_time)values(?,?,?)',
    ADD_PHOTO_TYPE:'insert into tb_photo_type(type_desc)values(?)',
    GET_PHOTOS_BYNAME:'select * from tb_photos where photo_name = ?',
    GET_PHOTO_TYPE:'select * from tb_photo_type where type_desc = ?',
    GET_PHOTO_TYPE_ALL:'select * from tb_photo_type',

    GET_VIDEO_ALL:'select a.id,c.video_name,a.video_url,a.video_cover,FROM_UNIXTIME(unix_timestamp(a.update_time),"%Y-%m-%d %h:%i:%s")update_time from tb_video a,tb_videos c where a.videos_id=c.id limit ?,?',
    GET_VIDEO_ALL_COUNT:'select count(1)sum from tb_video a,tb_videos c where a.videos_id=c.id',
    DELETE_VIDEO:'delete from tb_video where id=?',

    ADD_VIDEO:'insert into tb_video(videos_id,video_url,update_time)values(?,?,?)',
    ADD_VIDEOS:'insert into tb_videos(video_name,cover_page_url,update_time)values(?,?,?)',
    GET_VIDEOS_BYNAME:'select * from tb_videos where video_name = ?',
    UPDATE_VIDEOS:'update tb_videos set cover_page_url=? where id=?',
    UPDATE_VIDEO_COVER:'update tb_video set video_cover=? where id=?'

};
module.exports = $sql;