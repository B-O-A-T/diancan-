$(function () {
	
    layui.use(['laydate', 'form'], function () {
    });
	var sessionId=getCookie("sessionId");
	window.operateEvents = {
		'click .edit': function (e, value, row, index) {
            //修改操作
            layer.open({
                type: 2,
                title: '修改菜系信息',
                skin: 'alert-lay',
                content: 'foodtypes_edit.html?foodtypeId=' + row['foodtypeId'],
                area: ['30%', '40%']
            });
        },
        
        'click .delete': function (e, value, row, index) {
            //询问框
            layer.confirm('确定要删除 [' + row['foodtypeName'] + '] 吗?', {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                var url = "http://192.168.1.168:8080/deleteFoodType?id=" + row['foodtypeId']+"&sessionId=" +sessionId;
                $.get(url, function (data) {
                    if (data.success) {
                    	layer.msg(data.message, {
                            time: 2000, //2s后自动关闭
                            icon: 1
                        });
                        $("#foodtypestable").bootstrapTable('refresh');
                    } else {
                        layer.msg(data.message, {
                            time: 2000, //2s后自动关闭
                            icon: 2
                        });
                    }
                    layer.close(index);
                });
            });
        }
	};
	
	function queryParams(params) {
	    var param = {
	       
	        limit : this.limit, // 页面大小
	        offset : this.offset, // 页码
	        pageindex : this.pageNumber,
	        pageSize : this.pageSize
	    }
	    return param;
	} 
	
//  $("#btnRefresh").click(function () {
//      $("#table").bootstrapTable('refresh');
//  });
   	function checkLog(){     //在进入网页的时候加载该方法  
        setTimeout(go, 1000);/*在js中是ms的单位*/  
    };  
    function go(){  
        location.href="login.html";   
    };
    $('#foodtypestable').bootstrapTable({
        url: 'http://192.168.1.168:8080/getFoodTypes?sessionId=' +sessionId,
        method: 'get', //请求方式（*）
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
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "foodtypeId", //每一行的唯一标识，一般为主键列
        showToggle: true, //是否显示详细视图和列表视图的切换按钮
        cardView: false, //是否显示详细视图
        detailView: false, //是否显示父子表
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
        columns: [{
            title: '选择',
            checkbox: true,
            align: 'center',
            valign: 'middle'
        }, {
            field: 'foodtypeId',
            title: '菜系ID',
            visible: false
        }, {
            field: 'foodtypeName',
            title: '菜系名'
        }, {
        	field:'opreate',
            title:'操作',
            align:'center',
            formatter:function(value, row, index){
                var e = '<a title="编辑" class="edit btn btn-xs btn-info" style="margin-left: 10px"><i class="glyphicon glyphicon-edit"></i></a>';
                e += '<a title="删除" class="delete btn btn-xs btn-danger" style="margin-left: 10px"><i class="glyphicon glyphicon-trash"></i></a>';
            	return [e].join('');
            }, events: operateEvents
        }]
    });
    
    
    /*点击添加按钮显示表单*/
    $(".add-btn").on("click", function () {
        /*$(".form-hidden").removeClass("hidden");*/
        layer.open({
            type: 2,
            title: '添加菜系',
            skin: 'alert-lay',
            content: 'foodtypes_edit.html', //这里content是一个普通的String
             area: ['30%', '40%']
        });
    });
    
    
    /*选择复选框使删除所选按钮可点*/
    $('#foodtypestable').on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
        if ($(".delete-selected"))
            $(".delete-selected").prop('disabled', !$('#foodtypestable').bootstrapTable('getSelections').length);
    });
    /*这里获取你点击的复选框，返回所选的行，当没有选择任何行的时候返回一个空数组。*/
    function getIdSelections() {
        return $.map($('#foodtypestable').bootstrapTable('getSelections'), function (row) {
            return row.foodtypeId
        });
    }

    $(".delete-selected").click(function () {
        var ids = getIdSelections();
        console.log(ids);
        //询问框
        layer.confirm('是否删除'+ ids.length +'条数据？', {btn: ['是', '否'], shade: 0.3}, 
        function () {
            /*此处后台判断删除数据成功后页面变化*/
            var url = "http://192.168.1.168:8080/deleteFoodTypes?sessionId=" +sessionId;
            $.ajax({
            	type:"post",
            	url:url,
            	data:{"id":ids},
            	datatype:"json",
            	async:true,
            	timeout:30000,
            	success:function(data){
            		console.log(data);
            		if (data.success) {
                    	layer.msg(data.message, {
                            time: 2000, //2s后自动关闭
                            icon: 1
                        });
                        $("#couponstable").bootstrapTable('refresh');
                    } else {
                        layer.msg(data.message, {
                            time: 2000, //2s后自动关闭
                            icon: 2
                        });
                    }
            	},
            	error:function(data){
            		alert("系统错误，请联系维护人员");
            	}
            });
            $(".delete-selected").prop('disabled', true);
            layer.closeAll();
        }, function () {
            layer.closeAll();
        });
    });
});

