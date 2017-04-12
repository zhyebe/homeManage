/**
 * Created by IThink on 2016/1/5.
 */
var init = false;

function configLayer(){
    if (!init) {
        layer.config({
            extend: ['skin/black/style.css'] //加载新皮肤
        });
        init = true;
    }
}

//Frame层
function openFrameLayer(url,title,w,h,cb,closeBtn) {
    var screenHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
    var screenWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;

    if (closeBtn == undefined){
        closeBtn = 0;
    }

    var index = layer.open({
        type: 2
        , title: title
        , area: [w+'px', h+'px']
        ,shadeClose: false
        ,shade: 0.8
        ,closeBtn:closeBtn//1
        , maxmin: false
        , move: false
        , skin: 'layui-layer-demo'
        ,shift:2
        //, offset: [(screenWidth-w)/2+'px', (screenHeight-h)/2+'px']
        , content: url
        , cancel: function (index) {

        }
        ,success: function(layero, index){
            var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']];
            if ((cb != undefined) && (cb!= null)) {
                cb('success', {layer: layero, frame: iframeWin});
            }
            iframeWin.document.onmouseup = function(){
                return false;
            };
            iframeWin.document.oncontextmenu = function(){
                return false;
            };
        }
    });
    return index;
}

function closeFrameLayer(frameWin){
    var index = parent.layer.getFrameIndex(frameWin.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}

function closeFrameLayerByIndex(index){
    //var index = parent.layer.getFrameIndex(frameWin.name); //先得到当前iframe层的索引
    if (parent.layer_list.where({index:index}).length > 0) {
        console.log('remove index:'+index);
        parent.layer_list.remove(parent.layer_list.where({index: index}));
    }
    parent.layer.close(index); //再执行关闭
}

function openOffsetLayer(url,title,w,h,top,left,cb,closeBtn) {
    var screenHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
    var screenWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;

    if (closeBtn == undefined){
        closeBtn = 0;
    }

    var index = layer.open({
        type: 2
        , title: title
        , area: [w+'px', h+'px']
        ,shadeClose: false
        ,shade: 0
        ,closeBtn:closeBtn//1
        , maxmin: false
        , move: false
        , skin: 'layui-layer-demo'
        ,shift:4
        , offset: [top+'px',left+'px']
        , content: url
        //, zIndex: 30000000
        , zIndex: layer.zIndex //重点1
        , cancel: function (index) {

        }
        ,success: function(layero, index){
            layer.setTop(layero); //重点2
            var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']];
            if ((cb != undefined) && (cb!= null)) {
                cb('success', {layer: layero, frame: iframeWin});
            }
            //iframeWin.document.body.focus();
            iframeWin.document.onmouseup = function(){
                return true;
            };
            iframeWin.document.oncontextmenu = function(){
                return true;
            };
        }
    });
    return index;
}

//可移动层
function openMovableLayer(url,title,w,h,cb,skin,cb_close,id,cb_cancel) {
    configLayer();

    if (skin != undefined){
       return openMapMovableLayer(url,title,w,h,cb,skin,cb_close,id,cb_cancel);
    }
    else{
       return openNormalMovableLayer(url,title,w,h,cb,cb_close,cb_cancel);
    }
}

function topShadeShow(show) {
    if (show == true){
        top.document.getElementById('top_shade').style.display = 'block';
    }
    else{
        top.document.getElementById('top_shade').style.display = 'none';
    }
}

function openMapMovableLayer(url,title,w,h,cb,skin,cb_close,id,cb_cancel){
    //var screenHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
    //var screenWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;

    var style = 'layui-layer-demo';
    var shade = 0.3;
    if (skin != undefined){
        style = skin;
        //shade = 0;
    }

    var height;
    if (h == 0){
        height = '100%';
    }
    else{
        height = h + 'px';
    }

    //if (id) {
    //    if (layer_list.where({id: id}).length > 0) return;
    //}

    topShadeShow(true);
    var index = layer.open({
        type: 2
        , title: title
        , area: [w+'px', height]
        ,shadeClose: false
        ,shade: shade
        ,closeBtn:1
        , maxmin: false
        , skin: style//'layui-layer-demo'
        , zIndex: layer.zIndex //重点1
        ,shift:-1
        //, offset: [(screenWidth-w)/2+'px', (screenHeight-h)/2+'px']
        , content: url
        , cancel: function (index) {
            //if (layer_list.where({index:index}).length > 0) {
            //    console.log('remove index:'+index);
            //    layer_list.remove(layer_list.where({index: index}));
            //}

            if (cb_cancel == undefined){
                return;
            }
            var body = layer.getChildFrame('body', index);
            cb_cancel(body);
        }
        ,end:function(){
            topShadeShow(false);
            //    if (closeIndex != -1) {
        //        console.log(closeIndex);
        //        layer_list.remove(layer_list.where({index: closeIndex}));
        //    }
        //    closeIndex = -1;
            if (cb_close == undefined){
                return;
            }
            //var body = layer.getChildFrame('body', index);
            cb_close();
        }
        ,success: function(layero, index){
            //layer.setTop(layero); //重点2
            var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']];
            if ((cb != undefined) && (cb!= null)) {
                cb('success', {layer: layero, frame: iframeWin});
            }
            //topShadeShow(true);
            iframeWin.document.onmouseup = function(){
                return true;
            };
            iframeWin.document.oncontextmenu = function(){
                return true;
            };
        }
    });

    //if (id) {
    //    //console.log('add index:' + index + ';id:' + id);
    //    layer_list.add({id: id, index: index});
    //}
    return index;
}

function openNormalMovableLayer(url,title,w,h,cb,cb_close,cb_cancel){
    var screenHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
    var screenWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;

    var shade = 0.2;

    var height;
    if (h == 0){
        height = '100%';
    }
    else{
        height = h + 'px';
    }

    var index = layer.open({
        type: 2
        , title: title
        , area: [w+'px', height]
        ,shadeClose: false
        ,shade: shade
        ,closeBtn:1
        , maxmin: false
        , skin: 'layui-layer-demo'
        , zIndex: layer.zIndex //重点1
        ,shift:-1
        //, offset: [(screenWidth-w)/2+'px', (screenHeight-h)/2+'px']
        , content: url
        , cancel: function (index) {
            if (cb_cancel == undefined){
                return;
            }
            var body = layer.getChildFrame('body', index);
            cb_cancel(body);
        }
        ,end:function(){
        //    if (closeIndex != -1) {
        //        console.log(closeIndex);
        //        layer_list.remove(layer_list.where({index: closeIndex}));
        //    }
        //    closeIndex = -1;
            if (cb_close == undefined){
                return;
            }
            //var body = layer.getChildFrame('body', index);
            cb_close();
        }
        ,success: function(layero, index){
            layer.setTop(layero); //重点2
            var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']];
            if ((cb != undefined) && (cb!= null)) {
                cb('success', {layer: layero, frame: iframeWin});
            }
            iframeWin.document.onmouseup = function(){
                return true;
            };
            iframeWin.document.oncontextmenu = function(){
                return true;
            };
        }
    });

    return index;
}

/*function openMovableLayer(url,title,w,h,cb,skin,cb_close,id) {
    var screenHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
    var screenWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;

    //layer.config({
    //    extend: ['skin/black/style.css'] //加载新皮肤
    //});
    configLayer();

    var style = 'layui-layer-demo';
    var shade = 0.4;
    if (skin != undefined){
        style = skin;
        //shade = 0;
    }

    var height;
    if (h == 0){
        height = '100%';
    }
    else{
        height = h + 'px';
    }

    if (id) {
        if (layer_list.where({id: id}).length > 0) return;
    }

    var index = layer.open({
        type: 2
        , title: title
        , area: [w+'px', height]
        ,shadeClose: false
        ,shade: shade
        ,closeBtn:1
        , maxmin: false
        , skin: style//'layui-layer-demo'
        , zIndex: layer.zIndex //重点1
        ,shift:-1
        //, offset: [(screenWidth-w)/2+'px', (screenHeight-h)/2+'px']
        , content: url
        , cancel: function (index) {
            //clearInterval(fechInterval);
            if (layer_list.where({index:index}).length > 0) {
                console.log('remove index:'+index);
                layer_list.remove(layer_list.where({index: index}));
            }
            if (cb_close == undefined){
                return;
            }
            var body = layer.getChildFrame('body', index);
            cb_close(body);
        }
        //,end:function(){
        //    if (closeIndex != -1) {
        //        console.log(closeIndex);
        //        layer_list.remove(layer_list.where({index: closeIndex}));
        //    }
        //    closeIndex = -1;
        //}
        ,success: function(layero, index){
            //layer.setTop(layero); //重点2
            var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']];
            if ((cb != undefined) && (cb!= null)) {
                cb('success', {layer: layero, frame: iframeWin});
            }
            iframeWin.document.onmouseup = function(){
                return true;
            };
            iframeWin.document.oncontextmenu = function(){
                return true;
            };
        }
    });

    if (id) {
        //console.log('add index:' + index + ';id:' + id);
        layer_list.add({id: id, index: index});
    }
    return index;
}*/

//加载层
function openLoadLayer(){
    var index = layer.load(0, {shade: true,skin: 'layui-layer-demo',shade: 0.5});
    return index;
}

function closeLoadLayer(index){
    layer.close(index);
}

//询问框
function openConfirmLayer(title,btnYTitle,btnNTitle,yCb,nCb){
    var index = layer.confirm(title,
        {
        skin: 'layui-layer-demo',shade: 0.2,
        btn: [btnYTitle,btnNTitle] //按钮
        }, yCb, nCb);
    return index;
}

//提示
function openMsgLayer(msg){
    layer.msg(msg,{icon:0,skin: 'layui-layer-demo',shade: 0,shift:-1});
}

//alert
function openAlertLayer(content){
    var index = layer.alert(content,{skin: 'layui-layer-demo',shade: 0.5});
    return index;
}

function closeAlertLayer(index){
    layer.close(index);
}

//tip
function openTipLayer(tip, id, time) {
    if (time == undefined){
        var index = layer.tips(tip, id, {
            tips: [3, '#3595CC']
        });
        return index;
    }
    var index = layer.tips(tip, id, {
        tips: [3, '#3595CC'],
        time: time
    });
    return index;
};

