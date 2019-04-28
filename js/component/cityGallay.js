define(["ec",'jquery','require','bmap'],function(ec,$,require,bmap){
	function cityGallay(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	cityGallay.prototype={
		init:function(option){
			var self = this
			var div = '<div class="Box wid gallayBox"><div id="gallay-ec" class="Box wid"></div></div>'
			$("#"+self.option.obj).empty().append(div)
			var dats =self.option.data
			var echarts = ec.init(document.getElementById('gallay-ec'))
			var zoom = !!self.option.zoom?self.option.zoom:6;
			var roam = !!self.option.roam?self.option.roam:false;
			var endPoint=[120.19,30.26]
			var series = self.setSeries(endPoint)
			var opt = {
				bmap:{
					center:endPoint,
					zoom:zoom,
					roam:roam,
					mapStyle:{},
				},
				series:series
			}
			echarts.setOption(opt)
			var map = echarts.getModel().getComponent('bmap').getBMap()
			map.addControl(new BMap.MapTypeControl())
			var marker = new BMap.Marker(new BMap.Point(endPoint[0],endPoint[1]))
			map.addOverlay(marker)
			// var myIcon = {
			// 	icon:new BMap.Icon('',new BMap.Size())
			// } 
			var vals=[]
			dats.forEach(function(item,index){
				var point=new BMap.Point(item[0],item[1])
				var marker = new BMap.Marker(point)
				map.addOverlay(marker)
				var myGeo = new BMap.Geocoder();
				var inval=[]
				// 坐标转换城市名称
				myGeo.getLocation(point,function(result){
					if(result){
						var city = result.addressComponents.city
						inval.push(city)
						if(item.length>2)inval.push(item[item.length-1])
					}
				})
				vals.push(inval)
			})
		},
		setSeries:function(endPoint){
			var self = this,series=[],dats=self.option.data,data=[]
			var direction = !!self.option.direction?"in":"out";
			dats.forEach(function(item,index){
				var width= 1
				if(index<3){
					width = 4 - index
				}
				if(direction=='out'){
					data.push({
						coords:[endPoint,item],
						lineStyle:{
							normal:{
								width:width
							}
						}
					})
				}
				if(direction=='in'){
					data.push({
						coords:[item,endPoint],
						lineStyle:{
							normal:{
								width:width
							}
						}
					})
				}
			})
			series.push({
				type: 'lines',
				coordinateSystem: 'bmap',
				zlevel: 10,
				lineStyle:{
						normal:{
							curveness:0.3,
							type:"dashed",
							width:3,
							// color:["orange"]
						}
 		    	},
 		    data:data,
 		    effect:{
 		    	show:true,
 		    	symbolSize:5,
 		    	period:6,
 		    },
			})
			// series.push({
			// 		type: 'effectScatter',
   // 		    coordinateSystem: 'bmap',
   // 		    showEffecton:'render',
   // 		    rippleEffect: {
   //           brushType: 'stroke'
   //       	},
   //      	hoverAnimation: true,
   //      	itemStyle:{
   //      		color:"#de45ef"
   //      	}
			// })
			return series
		},
	}
	cityGallay.prototype.constructor = cityGallay
	return cityGallay
})