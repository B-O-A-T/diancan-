$(function() {
	var sessionId=getCookie("sessionId");
//	console.log(sessionId);
	var url = "http://192.168.1.168:8080/getTotal?sessionId=" +sessionId;
	var passengerFlow=  [];
	var money= [];
	var date =  [];
	var sessionId=getCookie("sessionId");
	console.log(sessionId);
	$.ajax({
    	type:"post",
    	url:url,
//  	data:{"id":ids},
    	datatype:"json",
    	async:true,
    	xhrFields:{
        	withCredential:true
        },
        crossDomin:true,
    	success:function(data){
//  		data=eval('('+data+')');
    		if(data.code==403){
    			console.log("未登录");
    			alert("未登录");
                checkLog();
    		}
    		for(var i= 0; i<data.length;i++){
    			passengerFlow.push(data[i].passengerFlow);
//  			console.log(data[i].passengerFlow);
//  			console.log(passengerFlow);
    			money.push(data[i].money);
    			date.push(data[i].date);
    		}
 			option1.xAxis.data = date;   
            option1.series.data= passengerFlow; // 设置图表  
            myChart1.setOption(option1);// 重新加载图表  
            option2.xAxis.data = date;   
            option2.series.data= money; // 设置图表  
            myChart2.setOption(option2);// 重新加载图表  
    	},
    	error:function(data){
    		alert(data.message);
    	}
   	});
   	
   	
   	function checkLog(){     //在进入网页的时候加载该方法  
            setTimeout(go, 2000);/*在js中是ms的单位*/  
    };  
    function go(){  
        location.href="login.html";   
    };
   	
	var myChart1 = echarts.init(document.getElementById('customerFlow_chart'));
    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '酒店一周客流量'
        },
        tooltip: {},
//      legend: {
//          data:['客人数量']
//      },
        xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: passengerFlow,
	        type: 'line',
	        areaStyle: {}
	    }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    
	var myChart2 = echarts.init(document.getElementById('turnover_chart'));
    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '酒店一周营业额'
        },
        tooltip: {},
//      legend: {
//          data:['客人数量']
//      },
        xAxis: {
	        type: 'category',
	        data: date
	    },	
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: money,
	        type: 'bar'
	    }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
});

	