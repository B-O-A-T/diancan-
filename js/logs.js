$(function () {
	
    layui.use(['laydate', 'form'], function () {
    });
	
	var sessionId=getCookie("sessionId");
	
	function queryParams(params) {
	    var param = {
	       
	        limit : this.limit, // 页面大小
	        offset : this.offset, // 页码
	        pageindex : this.pageNumber,
	        pageSize : this.pageSize
	    }
	    return param;
	} 
	
    $("#btnRefresh").click(function () {
        $("#logstable").bootstrapTable('refresh');
    });
   	function checkLog(){     //在进入网页的时候加载该方法  
        setTimeout(go, 1000);/*在js中是ms的单位*/  
    };  
    function go(){  
        location.href="login.html";   
    };
    $('#logstable').bootstrapTable({
        url: 'http://192.168.1.168:8080/getLogs?sessionId=' +sessionId,
        method: 'post', //请求方式（*）
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true, //是否显示行间隔色
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true, //是否显示分页（*）
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        queryParams: queryParams,//传递参数（*）
        sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        search: true, //是否显示表格搜索，此搜索是客户端搜索,也可以是服务端检索
        strictSearch: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true, //是否显示刷新按钮
        showExport: true,  //是否显示导出按钮  
	    buttonsAlign:"right",  //按钮位置  
	    exportTypes:['excel'],  //导出文件类型  
	    Icons:'glyphicon-export', 
        onLoadSuccess:function(data){  //加载失败时执行
        	console.log(data.code);
          	if (data.code==403){
          		layer.msg("未登录", {time : 1500, icon : 2});
          		checkLog();
          	}
        },
        onLoadError:function(){  //加载失败时执行
        	console.log("请求失败");

        },
	    exportOptions:{  
           ignoreColumn: [0,1],  //忽略某一列的索引  
           fileName: '系统操作表',  //文件名称设置  
           worksheetName: 'sheet1',  //表格工作区名称  
           tableName: '系统操作表',  
           excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
//         onMsoNumberFormat: DoOnMsoNumberFormat  
        },  
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "foodId", //每一行的唯一标识，一般为主键列
        showToggle: true, //是否显示详细视图和列表视图的切换按钮
        cardView: false, //是否显示详细视图
        detailView: false, //是否显示父子表
        columns: [{
            title: '选择',
            checkbox: true,
            align: 'center',
            valign: 'middle'
        }, {
            field: 'olId',
            title: '日志ID',
            visible: false
        }, {
            field: 'olType',
            title: '操作类型'
        }, {
            field: 'olModule',
            title: '操作模块'
        }, {
            field: 'olContent',
            title: '操作内容'
        }, {
            field:'adminId',
            title:'adminID'
        }, {
            field:'olAddDate',
            title:'操作时间'
        }, {
            field:'olIp',
            title:'操作人IP'
        }]
    });

});

