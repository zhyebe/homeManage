/**
 * Created by zhangyong on 2017/03/03.
 */
exports.errors = function errors(name,err){
    console.log("[**"+name+"**]:{"+err+"}");
};
exports.results = function results(name,result){
    console.log("[**"+name+"**]:"+JSON.stringify(result));
};