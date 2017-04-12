/**
 * Created by zhangyong on 2017/03/10.
 */
var connection=require('../pool.js'),
    thenjs=require('thenjs'),
    xlsx=require('xlsx'),
    fs = require("fs"),
    interface=require('../../service/interface.js'),
    $sql=require('./mediaDao');
var async = require('async');
var config=require('../../config');
var key=require('../../service/rsa.js');
var dateUtils=require('../../dist/common/js/dateUtils.js');
var consoleMsg = require('../consoleMsg.js');

exports.getPhotos = function getPhotos(callback){
    connection.query($sql.GET_PHOTOS,function(err,result){
        if(err){
            consoleMsg.errors('getPhotos',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getPhoto = function getPhoto(arg,callback){
    connection.queryArg($sql.GET_PHOTO,[arg.photos_id],function(err,result){
        if(err){
            consoleMsg.errors('getPhoto',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getPhotoPage = function getPhotoPage(arg,callback){
    connection.queryArg($sql.GET_PHOTO_PAGE,[arg.photos_id,parseInt(arg.start),parseInt(arg.length)],function(err,result){
        if(err){
            consoleMsg.errors('getPhotoPage',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getPhotoCount = function getPhotoCount(arg,callback){
    connection.queryArg($sql.GET_PHOTO_COUNT,[arg.photos_id],function(err,result){
        if(err){
            consoleMsg.errors('getPhotoCount',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getVideos = function getVideos(callback){
    connection.query($sql.GET_VIDEOS,function(err,result){
        if(err){
            consoleMsg.errors('getVideos',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getVideo = function getVideo(arg,callback){
    connection.queryArg($sql.GET_VIDEO,[arg.videos_id],function(err,result){
        if(err){
            consoleMsg.errors('getVideo',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getVideoPage = function getVideoPage(arg,callback){
    connection.queryArg($sql.GET_VIDEO_PAGE,[arg.videos_id,parseInt(arg.start),parseInt(arg.length)],function(err,result){
        if(err){
            consoleMsg.errors('getVideoPage',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getVideoCount = function getVideoCount(arg,callback){
    connection.queryArg($sql.GET_VIDEO_COUNT,[arg.videos_id],function(err,result){
        if(err){
            consoleMsg.errors('getVideoCount',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getPhotoAll = function getPhotoAll(arg,callback){
    var draw = arg.draw,
        start = parseInt(arg.start),
        length = parseInt(arg.length);
    var param = [start,length];
    thenjs(function(cont){
        connection.query($sql.GET_PHOTO_ALL_COUNT,function(err,result){
            if(err){
                consoleMsg.errors('getPhotoAll',err);
                cont(err);
            }else{
                cont(null,result);
            }
        });
    }).then(function(cont,result){
        var sum = result[0].sum;
        connection.queryArg($sql.GET_PHOTO_ALL,param,function(err,results){
            if(err){
                consoleMsg.errors('getPhotoAll',err);
                cont(err);
            }else{
                var formatResult = {
                    "draw": draw,
                    "recordsTotal": sum,
                    "recordsFiltered": sum,
                    "data": []
                };
                for(var i=0;i<results.length;i++){
                    var tmp = [];
                    var obj=JSON.stringify(results[i]);
                    tmp.push(results[i].id);
                    tmp.push(results[i].photo_name);
                    tmp.push('<img width="167" height="28" src="'+results[i].img_url+'">');
                    tmp.push(results[i].type_desc);
                    tmp.push(results[i].update_time);
                    tmp.push('<input type="button" class="inpt btn btn-danger" value="删除" onclick=\'deletePhoto('+obj+');\'>');
                    formatResult.data.push(tmp);
                }
                cont(null,formatResult);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
};

exports.deletePhoto =function deletePhoto(arg,callback){
    var urls = arg.photo_url.split('/');
    var photo_url =urls[urls.length-1];
    var photo_path = './dist/upload/img/'+photo_url;
    var param = [arg.id];
    connection.queryArg($sql.DELETE_PHOTO,param,function(err,result){
        if(err){
            consoleMsg.errors('deletePhoto',err);
            callback(err);
        }else{
            try{
                fs.unlinkSync(photo_path);
            }catch(e){
                consoleMsg.errors('deleteVideo',e);
            }
            callback(null,result);
        }
    });
};
exports.uploadSave = function uploadSave(arg,callback){
    var photos_id = arg.photos_id,
        photos_name = arg.photos_name,
        types_id = arg.types_id,
        types_name = arg.types_name,
        path = arg.path,
        update_time = arg.update_time,
        imgs = eval('('+arg.imgs+')');
    var cover_page_url = path+imgs[0];
    thenjs(function(cont){
        if(photos_id == 0){
            thenjs(function(conts){
                connection.queryArg($sql.ADD_PHOTOS,[photos_name,cover_page_url,update_time],function(err,rets){
                    if(err){
                        conts(err);
                    }else{
                        conts(null,rets);
                    }
                });
            }).then(function(conts,ret_s){
                connection.queryArg($sql.GET_PHOTOS_BYNAME,[photos_name],function(err,result){
                    if(err){
                        conts(err);
                    }else{
                        conts(null,result[0].id);
                    }
                });
            }).fin(function(conts,errs,ret_s){
                if(errs){
                    cont(errs);
                }else{
                    cont(null,ret_s);
                }
            });
        }else{
            cont(null,photos_id);
        }
    }).then(function(cont,result){
        photos_id = result;
        if(types_id == 0){
            thenjs(function(conts){
                connection.queryArg($sql.ADD_PHOTO_TYPE,[types_name],function(err,rets){
                    if(err){
                        conts(err);
                    }else{
                        conts(null,rets);
                    }
                });
            }).then(function(conts,ret_s){
                connection.queryArg($sql.GET_PHOTO_TYPE,[types_name],function(err,result){
                    if(err){
                        conts(err);
                    }else{
                        conts(null,result[0].id);
                    }
                });
            }).fin(function(conts,errs,ret_s){
                if(errs){
                    cont(errs);
                }else{
                    cont(null,ret_s);
                }
            });
        }else{
            cont(null,types_id);
        }
    }).then(function(cont,result){
        types_id = result;
        async.map(imgs,function(item,cb){
            connection.queryArg($sql.ADD_PHOTO,[photos_id,path+item,types_id,update_time],function(err,result){
                if(err){
                    cb(err);
                }else{
                    cb(null,result);
                }
            });
        },function(errs,results){
            if(errs){
                cont(err);
            }else{
                cont(null,results);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getVideoAll  = function getVideoAll(arg,callback){
    var draw = arg.draw,
        start = parseInt(arg.start),
        length = parseInt(arg.length);
    var param = [start,length];
    thenjs(function(cont){
        connection.query($sql.GET_VIDEO_ALL_COUNT,function(err,result){
            if(err){
                consoleMsg.errors('getVideoAll',err);
                cont(err);
            }else{
                cont(null,result);
            }
        });
    }).then(function(cont,result){
        var sum = result[0].sum;
        connection.queryArg($sql.GET_VIDEO_ALL,param,function(err,results){
            if(err){
                consoleMsg.errors('getVideoAll',err);
                cont(err);
            }else{
                var formatResult = {
                    "draw": draw,
                    "recordsTotal": sum,
                    "recordsFiltered": sum,
                    "data": []
                };
                for(var i=0;i<results.length;i++){
                    var tmp = [];
                    var obj=JSON.stringify(results[i]);
                    tmp.push(results[i].id);
                    tmp.push(results[i].video_name);
                    tmp.push('<a href=\'javascript:openVideo('+obj+');\'>'+results[i].video_url+'</a>');
                    tmp.push('<img width="90" height="28" class="cover-img" src="'+results[i].video_cover+'"><input class="cover-file" onchange=\'uploadCover('+obj+');\' id="cover_upload'+results[i].id+'" type="file" accept="image/gif,image/png,image/jpeg">');
                    tmp.push(results[i].update_time);
                    tmp.push('<input type="button" class="inpt btn btn-danger" value="删除" onclick=\'deleteVideo('+obj+');\'>');
                    formatResult.data.push(tmp);
                }
                cont(null,formatResult);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.uploadVideoSave = function uploadVideoSave(arg,callback){
    var videos_id = arg.videos_id,
        videos_name = arg.videos_name,
        path = arg.path,
        update_time = arg.update_time,
        videos_cover = arg.videos_cover,
        videos = eval('('+arg.videos+')');
    thenjs(function(cont){
        if(videos_id == 0){
            thenjs(function(conts){
                connection.queryArg($sql.ADD_VIDEOS,[videos_name,videos_cover,update_time],function(err,rets){
                    if(err){
                        conts(err);
                    }else{
                        conts(null,rets);
                    }
                });
            }).then(function(conts,ret_s){
                connection.queryArg($sql.GET_VIDEOS_BYNAME,[videos_name],function(err,result){
                    if(err){
                        conts(err);
                    }else{
                        conts(null,result[0].id);
                    }
                });
            }).fin(function(conts,errs,ret_s){
                if(errs){
                    cont(errs);
                }else{
                    cont(null,ret_s);
                }
            });
        }else{
            connection.queryArg($sql.UPDATE_VIDEOS,[videos_cover,videos_id],function(err,rets){
                if(err){
                    cont(err);
                }else{
                    cont(null,videos_id);
                }
            });
        }
    }).then(function(cont,result){
        videos_id = result;
        async.map(videos,function(item,cb){
            connection.queryArg($sql.ADD_VIDEO,[videos_id,path+item,update_time],function(err,result){
                if(err){
                    cb(err);
                }else{
                    cb(null,result);
                }
            });
        },function(errs,results){
            if(errs){
                cont(err);
            }else{
                cont(null,results);
            }
        });
    }).fin(function(cont,err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.deleteVideo = function deleteVideo(arg,callback){
    var urls = arg.video_url.split('/');
    var covers = arg.video_cover.split('/');
    var video_url =urls[urls.length-1];
    var video_cover  = covers[covers.length-1];
    var video_path = './dist/upload/video/'+video_url;
    var cover_path = './dist/upload/img/'+video_cover;
    var param = [arg.id];
    connection.queryArg($sql.DELETE_VIDEO,param,function(err,result){
        if(err){
            consoleMsg.errors('deleteVideo',err);
            callback(err);
        }else{
            try{
                fs.unlinkSync(video_path);
                fs.unlinkSync(cover_path);
            }catch(e){
                consoleMsg.errors('deleteVideo',e);
            }
            callback(null,result);
        }
    });
};

exports.checkPhotos = function checkPhotos(arg,callback){
    connection.queryArg($sql.GET_PHOTOS_BYNAME,[arg.photos_name],function(err,result){
        if(err){
            consoleMsg.errors('checkPhotos',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.checkTypes = function checkTypes(arg,callback){
    connection.queryArg($sql.GET_PHOTO_TYPE,[arg.types_name],function(err,result){
        if(err){
            consoleMsg.errors('checkTypes',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.checkVideos = function checkVideos(arg,callback){
    connection.queryArg($sql.GET_VIDEOS_BYNAME,[arg.videos_name],function(err,result){
        if(err){
            consoleMsg.errors('checkVideos',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.uploadSaveCover = function uploadSaveCover(arg,callback){
    connection.queryArg($sql.UPDATE_VIDEO_COVER,[arg.video_cover,arg.video_id],function(err,result){
        if(err){
            consoleMsg.errors('uploadSaveCover',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};
exports.getPhotoTypes = function getPhotoTypes(callback){
    connection.query($sql.GET_PHOTO_TYPE_ALL,function(err,result){
        if(err){
            consoleMsg.errors('getPhotoTypes',err);
            callback(err);
        }else{
            callback(null,result);
        }
    });
};