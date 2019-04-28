define(['jquery','Module',"commonData"],function($,Module,commonData){
	function ajax(option){
		var url = option.url
		$.ajax({
			url:'http://aladdin.zj.chinamobile.com/city24/'+url,
			type:"post",
			dataType:"json",
			data:$.extend({},option.params),
			success: function(data) {
				option.callback(data.data);
			},
			error:function(error){
				option.defaultCb && option.defaultCb(data,option);
			}
		})
	}
	function maketime(dd){
		var dd_year=dd.getFullYear();
   		var dd_month=(dd.getMonth()+1)>9?dd.getMonth()+1:'0'+(dd.getMonth()+1);
   		var dd_day=dd.getDate()>9?dd.getDate():'0'+dd.getDate();
   		return dd_year+'/'+dd_month+'/'+dd_day;
	}
	var todayX=new Date();
	var yesterdayX=new Date(todayX.getTime() - 24*60*60*1000);
	var today=maketime(todayX)
	var yesterday=maketime(yesterdayX);

	new Module({
		type:'pie',
		obj:"customerD",
		data:[{'女':'35'},{"男":65}]
	})
	new Module({
		type:"bar",
		obj:'customerE',
		percent:true,
		data:[['18-24','450'],['25-29','560'],['30-34','560'],['35-39','450'],['40-49','350'],['50-59','530'],['60以上','340']]
	})
	new Module({
		type:'line',
		obj:'customerF',
		colors:['#23c750',"#1390fd",'#fac919'],
		data:[['到店顾客',0,1,4,5,6,8,],['首次到店顾客',0,5,6,7,8,2],['多次到店顾客',0,3,5,2,0,3]]
	}),
	new Module({
		type:'bar',
		obj:'customerB',
		title:'',
		data:[['微信','340'],['微博',564],['QQ',230],['支付宝',180]]
	})
	new Module({
		type:'radar',
		obj:'customerC',
		// title:'地区',
		data:[['天蝎座',6540],['水瓶座',7609],['天秤座',9870],['摩羯座','7609'],['巨蟹座',6123]]
	})
	new Module({
		type:'timePicker',
		obj:'hallflowXD',
		onshow:true,
		callbackClick:function(val){}
	})
	
	new Module({
		type:"dateRange",
		obj:'hallflowXZ',
		starValue:yesterday,
		endValue:today
	})
  /*ajax({
		url:'getData/subfileIndex',
		params:{'zbId':'ZB075,ZB982'},
		callback:function(dats){
			new Module({
		   		type:"emptyPie",
		   		areaId:'customer5',
		   		data:dats
		   	})
		}
	})
	ajax({
		url:'getData/subfileIndex',
		params:{'zbId':'ZB218,ZB983'},
		callback:function(dats){
			new Module({
		   		type:"cityRadar",
		   		obj:'customer0',
		   		split:2,
   				// legend:false,
   				color:['#da92e6'],
		   		data:dats
		   	})
		}
	})
  ajax({
		url:'getData/subfileIndex',
		params:{'zbId':'ZB021,ZB968'},
		callback:function(dats){
			new Module({
		   		type:'cityPie',
		   		obj:"customerP",
		   		title:'当前性别分析',
		   		// color:['#ffa647','#70c4ff'],
			 	fontColor:'#ffa647',
		   		data:dats
		   	})
		}
	})
  ajax({
		url:'getData/subfileIndex',
		params:{'zbId':'ZB152,ZB978'},
		callback:function(dats){
			new Module({
		   		type:'cityLine',
		   		obj:"customerW",
		   		title:'杭州早高峰客流分析',
		   		// color:['#408993'],
		   		data:dats
		   	})
		}
	})
	ajax({
		url:'getData/subfileIndex',
		params:{'zbId':'ZB041,ZB042,ZB043,ZB996'},
		callback:function(dats){
			new Module({
	   		type:'overlayPie',
	   		areaId:"customerP2",
	   		data:dats,
	   	})
		}
	})*/
	new Module({
 		type:'cityGallay',
 		obj:"customer8",
 		data:[[116.395645038,39.9299857781,456],[120.53,36.86,567],[119.97,35.88,78],[119.64,29.12],[113,28.21],
		    [118.88,28.97]],
 	})
 	new Module({
 		type:'zheMap',
 		obj:"hallflowZ",
 		city:{
	   			"杭州市":571,"嘉兴市":573,"金华市":579,
	   			"湖州市":"572","衢州市":570,"丽水市":"578",
	   			"绍兴市":"575","宁波市":"574","舟山市":"580",
	   			"台州市":"576","温州市":"577",
	   		}
 	})
    var obj1={op_time: "猛虎店", "": "0.0584"};
    var obj2={op_time: "金牛店", "": "0.3664"};
    var obj3={op_time: "瘦狗店", "": "0.4560"};
    var obj4={op_time: "山猫店", "": "0.1191"};
 	new Module({
	  type:'promotionBar',
 		obj:"hallflowC",
 		color:['#64b4f1','#6cce7f','#f3c277','#e74343'],
 		backgroundBar:true,
//			 		percent:true, 
 		data:[obj1,obj2,obj3,obj4],
 		addClick:function(x){
 			var div='<div id="sanjiao"></div>'
 			$("#hallflowC #sanjiao").remove()
	 		$("#hallflowC").append(div)
 			$("#hallflowC #sanjiao").css({
 				left:(x-10)+'px'
 			})	
 		}
	})
	new Module({
   		type:"echarts3D",
   		obj:'customer0',
   		data:{
   			type:'line3D',
   			data: [[0,2,5],[0,1,1],[0,2,1],[0,3,0],[1,4,0],[0,5,0],[2,6,0],[0,7,0],[0,8,0],[0,9,0]],
   		}
   	})
   	new Module({
   		type:"circe",
   		obj:'hallflowde',
   		data:{
   			hour:[9,14,15],
   			day:5
   		}
   	})
   new Module({
   		type:"custom",
   		obj:'customer5',
   		data:[8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 14.0, 14.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6]
   	})
    new Module({
   		type:"DatePicker",
   		elem:'#customerW',
        setVal:'2018/03/04',
        min:"2018/12/04",
        max:"2018/12/17",
   	})
   	// 和横坐标：cusNum客流量，纵坐标:销售量shopNum
   	//
   		var data=[	[10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [4.0,9.0],
            [5.0, 5.68]]
         var ndata=[]
         for(var iten of data){
         	ndata.push({
         		name:data.indexOf(iten)+'rode',
         		'客流量':iten[0],
         		'销售量':iten[1]
         	})
         }
   	 new Module({
   		type:"quadrant",
   		obj:'customerP',
   		splitPoint:[8],
   		data:ndata,
        seriesName:['潜力店','旗舰店','提升店','流量店']
   	})
})