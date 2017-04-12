/**
 * Created by zhangyong on 2017/02/14.
 * required jQuery 2.1.1
 */

/**
 * @param ajaxUrl ajax URL,【格式】：'http://dd/url/...'
 * @param param POST param,【格式】：{width:23,height:20,...}
 * @param tableDom Dom,【格式】：'#id'、'table'、'.table'等
 * @constructor
 * @use eg:
 * 1）服务端demo（以nodejs为例，其他语言，根据相关语法规则变更）：
 *      a、接收参数相关写法：例（假如arg表示请求的body，即req.body）
 *      ---------------------------*自带参数*---------------------------------
 *        var draw = arg.draw,//【draw】属于自带参数
              start = arg.start,//【start】属于自带参数
              length = arg.length;//【length】属于自带参数
          var data = JSON.parse(arg.extra_search);//【extra_search】属于自带参数

        --------------------------*自定义参数*---------------------------------
          var user = data.user;//属于自定义参数
          var pwd = data.pwd;//属于自定义参数
          ...........
          var time = data.time;//属于自定义参数
          ..........等等。

 *      b、错误或无数据返回格式：
 *        {"draw": draw,"recordsTotal": 0,"recordsFiltered": 0,"data": []}
 *
 *      c、正确有数据返回格式：
 *        {"draw": draw,"recordsTotal": 10,"recordsFiltered": 10,"data": [[1,3,...],[2,3,...],...]}
 *
 *  2）前端 js demo：
 *     a、须引入的js依赖文件有（包括本文件）：
 *       1、jquery.min.js，
 *       2、DataTables-1.10.11/media/js/jquery.dataTables.min.js，
 *       3、DataTables-1.10.11/media/js/dataTables.bootstrap.min.js，
 *       4、dataTable-ajax.js
 *
 *     b、使用方法：（例）
 *       >>>方式一：===============================================
 *       var dataTable = null;
 *       function init(){
 *           //【注意】：初始化DataTable，避免二次执行，否则会导致新建不同对象，造成冲突。
 *          dataTable = new DataTable('/front/list',{user:'daniel',id:1},'#table',function(row, data, index){
 *              do something.....
 *          },[
 *              {"width": "90px", "targets": 0},
                {"width": "100px", "targets": 1},
                same..............
 *          ]);
 *       }
 *       //渲染表格
 *       dataTable.freshTable();
 *
 *       >>>方式二：===============================================
 *       var dataTable = null;
 *       function init(){
 *           //【注意】：初始化DataTable，避免二次执行，否则会导致新建不同对象，造成冲突。
 *          dataTable = new DataTable();
 *       }
 *       dataTable.setParams('/front/list',{user:'daniel',id:1},'#table',function(row, data, index){
 *              do something.....
 *          },[
 *              {"width": "90px", "targets": 0},
                {"width": "100px", "targets": 1},
                same..............
 *          ]);
 *       //渲染表格
 *       dataTable.freshTable()
 */
function DataTable(ajaxUrl,param,tableDom,rowCallback,columnDefs){
    this.ajaxUrl=ajaxUrl;
    this.param=param;
    this.tableDom=tableDom;
    this.table=null;
    this.rowCallback = rowCallback;//在渲染行的时候执行，可根据需要回调，其中有三个参数 row, data, index
    this.columnDefs = columnDefs;//【设置列宽，(targets表示列序号)】格式:[{"width": "90px", "targets": 0},....]
}

DataTable.prototype.getAjaxUrl=function(){
    return this.ajaxUrl;
};
DataTable.prototype.getParam=function(){
    return this.param;
};
DataTable.prototype.getTableDom=function(){
    return this.tableDom;
};
DataTable.prototype.setParam=function(param){
    this.param=param;
};
DataTable.prototype.setAjaxUrl=function(ajaxUrl){
    this.ajaxUrl=ajaxUrl;
};
DataTable.prototype.setTableDom=function(tableDom){
    this.tableDom=tableDom;
};
DataTable.prototype.setParams=function(ajaxUrl,param,tableDom,rowCallback,columnDefs){
    this.ajaxUrl=ajaxUrl;
    this.param=param;
    this.tableDom=tableDom;
    this.rowCallback = rowCallback;//在渲染行的时候执行，可根据需要回调，其中有三个参数 row, data, index
    this.columnDefs = columnDefs;//【设置列宽，(targets表示列序号)】格式:[{"width": "90px", "targets": 0},....]
};
DataTable.prototype.toString=function(){
    return '(' + this.ajaxUrl + ', ' + this.param + ',' +this.tableDom +')';
};
DataTable.prototype.freshTable=function(){
    if(this.table){
        this.table.ajax.reload();
    }else{
        this.showTable();
    }
};
DataTable.prototype.showTable=function(){
    var self=this;
    self.table = $(self.getTableDom()).DataTable({
        "dom":'lrtip',
        "paging": true,
        "pagingType": "full_numbers",
        "ordering": false,
        "searching": false,
        "scrollX":false,
        "scrollY":false,
        "autoWidth":false,
        "language": {
            "sProcessing": "<p style='color: #222A36;font-size:16px;font-weight:600;font-family: '微软雅黑'>处 理 中...</p>",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": self.getAjaxUrl(),
            "type": "POST",
            "data": function (d) {
                d.extra_search = JSON.stringify(self.getParam());
            }
        },
        "rowCallback": self.rowCallback,
        //"columnDefs": self.columnDefs
    });
};