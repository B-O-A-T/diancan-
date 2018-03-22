$(function () {
    layui.use(['laydate', 'form'], function () {
    });
	var sessionId=getCookie("sessionId");
//	window.operateEvents = {
//		'click .edit': function (e, value, row, index) {
//          //修改操作
//          layer.open({
//              type: 2,
//              title: '修改菜系信息',
//              skin: 'alert-lay',
//              content: 'foodtypes_edit.html?foodTypeId=' + row['foodtypeId'],
//              area: ['50%', '80%']
//          });
//      },
//      
//      'click .delete': function (e, value, row, index) {
//          //询问框
//          layer.confirm('确定要删除 [' + row['foodtypeName'] + '] 吗?', {
//              btn: ['确定', '取消'] //按钮
//          }, function (index) {
//              var url = "http://192.168.1.168:8080/deletefoodType?id=" + row['foodtypeId'] ;
//              $.get(url, function (data) {
//                  if (data.success) {
//                  	layer.msg(data.message, {
//                          time: 2000, //2s后自动关闭
//                          icon: 1
//                      });
//                      $("#foodtypestable").bootstrapTable('refresh');
//                  } else {
//                      layer.msg(data.message, {
//                          time: 2000, //2s后自动关闭
//                          icon: 2
//                      });
//                  }
//                  layer.close(index);
//              });
//          });
//      }
//	};


	//获取url中的参数
	function getParams(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
   	};    

//	var foodIds = getParams("orderFood");
////	console.log(foodIds);
//	var foodsNum = getParams("orderFoodNum");
////	console.log(foodNum);
	var orderId = getParams("orderId");
//	var foodIdArray = [];
//	var foodsNumArray = [];
//	foodIdArray = foodIds.split("|");
////	console.log(foodIdArray);
//	foodsNumArray = foodsNum.split("|");
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
	
	$.ajax({
		url: 'http://192.168.1.168:8080/getOrderDetail?orderId='+ orderId + '&sessionId=' +sessionId,
		type : 'post',
        dataType : 'json',
        async: false,
	    timeout: 10000,    //超时时间
	    cache: false,
        success:function(data){	
        	var obj = [];
        	for(var i=0;i<data.length;i++){
        		var da = data[i];
        		console.log(da);
        		var dcfood = da.food;
        		var foodId = dcfood.foodId;
        		var foodName = dcfood.foodName;
        		var foodNum = da.foodNum;
//      		console.log(foodName);
				var ans = {'orderFoodId': foodId, 'orderFoodName': foodName, 'orderFoodNum': foodNum};
        		obj.push(ans);
        	}
    	    $('#orderdetailtable').bootstrapTable({
		        data:obj,
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
		        search: false, //是否显示表格搜索，此搜索是客户端搜索,也可以是服务端检索
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
		        
		        columns: [{
		            field: 'orderFoodId',
		            title: '菜品ID',
		        } ,{
		            field: 'orderFoodName',
		            title: '菜品名',
		        }, {
		            field: 'orderFoodNum',
		            title: '数量',
		            editable: {
	                    type: 'text',
	                    title: '数量',
	                    validate: function (v) {
	                        if (isNaN(v)) return '数量必须是数字';
	                        var num = parseInt(v);
	                        if (num < 0) return '数量不能小于零';
	                    }
               		}
		        }],
		        onEditableSave: function (field, row, oldValue, $el) {
		        	var num = obj.length;
//		        	console.log(row);
		        	for(var i =0;i<num;i++){
		        		if(obj[i].orderFoodId==row.orderFoodId){
		        			console.log(obj[i].orderFoodId);
		        			if(row.orderFoodNum=="0"){
		        				obj.splice(i,1);
		        			} else {
		        				obj[i].orderFoodNum = row.orderFoodNum;
		        				console.log(row.orderFoodNum);
		        			}
		        		}
		        	}

					var foodIdArray=[];
					var foodsNumArray=[];
					for(var i =0;i<num;i++){
						foodIdArray.push(obj[i].orderFoodId);
						foodsNumArray.push(obj[i].orderFoodNum);
					}
					var ans_foodIdArray = foodIdArray.toString();
					var ans_foodsNumArray = foodsNumArray.toString();
					console.log(ans_foodIdArray);
					console.log(ans_foodsNumArray);
	                $.ajax({	
	                    url: 'http://192.168.1.168:8080/editOrderDetailSubmit?orderId='+ orderId + '&foodIds=' + ans_foodIdArray + '&foodNum=' + ans_foodsNumArray+ '&sessionId=' +sessionId,
                		type : 'post',
				        dataType : 'json',
				        async: false,
					    timeout: 10000,    //超时时间
					    cache: false,
	                    success: function (data) {
	                        if (data.success) {
		                    	layer.msg(data.message, {
		                            time: 2000, //2s后自动关闭
		                            icon: 1
		                        });
		                        $("#orderstable").bootstrapTable('refresh');
		                    } else {
		                        layer.msg(data.message, {
		                            time: 2000, //2s后自动关闭
		                            icon: 2
		                        });
		                    }
		            	},
		            	error:function(data){
		            		alert("系统错误，请联系维护人员");
		            	},
	                    complete: function () {
	                    }
	
				    });
				}
		    });
        },
        error:function(data){
        	layer.msg(data.message, {
                time: 2000, //2s后自动关闭
                icon: 2
            });
        }
	});
});

