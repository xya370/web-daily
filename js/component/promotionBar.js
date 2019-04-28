define(['ec','jquery','require'],function(ec,$,require){
	function promotionBar(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	promotionBar.prototype={
		init:function(option){
			var self= this;
			var dataType = typeof self.option.dataType!=='undefined' && self.option.dataType !==''? self.option.dataType :1;
			var titleLabel = typeof self.option.titleLabel!=='undefined' && self.option.titleLabel !==''? self.option.titleLabel :''
			$("#"+self.option.obj).empty()
			if(!!titleLabel){
				$("#"+self.option.obj).append('<div class="titleBar">'+titleLabel+'</div>')
			}
			$("#"+self.option.obj).append('<div class="wid Box" id="'+self.option.obj+'_probarBox"></div>')
			if(!!titleLabel){
				$("#"+self.option.obj).find('#'+self.option.obj+'_probarBox').css({
					'height':'calc(100% - 40px)',
					'padding':'2% 0 5% 7%'
				})
			}
			var title = typeof self.option.title!=='undefined' && self.option.title !==''? self.option.title :''
			var rotate = typeof self.option.rotate!=='undefined' && self.option.rotate !==''? self.option.rotate :0
			let fsize =12;
			var data = self.option.data;
			var cross = self.option.cross == true ? true:false;
			var xData=[],newDatas = [],pointData=[],dat=[],series=[],keys=[]
			var barWid = self.option.cross == true ? 10:20;
			var color = typeof self.option.color!=='undefined'&&self.option.color!==''?self.option.color:['#40A2E1'];
			var legend = typeof self.option.legend !='undefined' && self.option.legend!==''? self.option.legend:true;
			for(var key in data[0]){
				keys.push(key)
			}
			keys.forEach(function(item,index){
				var idat=[]
				data.forEach(function(ite,inde){
					for(var key in ite){
						if(key == item){
							idat.push(ite[key])
						}
					}
				})
				newDatas.push(idat)
			})
			dat=newDatas.slice(1,newDatas.length)
			xData.push(newDatas[0])
			var maxs=[],total=[]
			dat.forEach(function(item,index){
				var m =0
				item.forEach(function(ite,inde){
					m = typeof total[inde] == 'undefined'?0:total[inde];
					if(cross==true && item[inde]<0){
						item[inde] = 0 - item[inde]
					}
					total[inde] = m+item[inde]
				})
			})
			var tal = Math.max.apply(null,total)
			dat.forEach(function(item,index){
				var ipont=[]
				for(var m =0;m<item.length;m++){
					var ital = total[m]*1.1
					if(dat.length == 1)ital=tal*1.1
					var n = (+item[m]*100)/ital
					ipont.push(n.toFixed(2))
				}
				pointData.push(ipont)
			})
			
			total.forEach(function(ite,ind){
				maxs[ind]= +tal*1.1
			})
			if(cross==true){
				dat[0].forEach(function(ite,ind){
					dat[0][ind] = 0 - ite
				})
				pointData[0].forEach(function(item,index){
					pointData[0][index] = 0 - item
				})
			}
			dataT = self.option.percent == true ?pointData:dat;
			dataT.forEach(function(item,index){
				var idata=[]
				item.forEach(function(iten,ind){
					idata.push({
						value:iten,
						itemStyle:{
							color:color.length>1?color[ind]:color[0]
						}
					})
				})
				series.push({
					type:'bar',
					data:idata,
					name:keys.slice(1,keys.length)[index],
					barWidth:20,
					stack:"a",
					yAxisIndex:0,
					xAxisIndex:0,
					itemStyle:{
						normal:{
							fontSzie:fsize
						}
					},
				})
			})

			// 柱图基本设置
			var opt={
				title:{
					text:title,
					top:8,
					left:40,
					textStyle:{
						color:"#354657",
						fontSize:16,
						fontWeight:700,
						rich:{
							a:{
								color:'#94999c'
							}
						}
					}
				},
				textStyle:{
					fontFamily:"Microsoft YaHei",
				},
				color:color,
				tooltip:{
					tigger:"axis",
					formatter:function(params){
						var value  = self.option.cross == true && params.value < 0 ? (0 - params.value):params.value
						var val =self.option.percent == true ?value+"%":value;
						var div='<div class="formaBox"><div class="topBox"><span style="padding-right:3px;">'+params.name+'</span>'+title 
//								+ total[params.dataIndex]
								+'</div>'
								+'<div class="bottom">'
								+'<span style="display:inline-block;margin-right:5px;border-radius:10px;border:1px solid #fff;width:9px;height:9px;background-color:'+params.color+';"></span>'
								+params.seriesName+':'+val
								+'</div></div>'
						return div
					}
				},
				xAxis:{
					type:'category',
					axisLine:{
						lineStyle:{
							color:"#d9d9d9"	
						}
					},
					axisTick:{
						lineStyle:{
							color:"#d9d9d9"	
						}
					},
					axisLabel:{
						color:"#919aa5",
						rotate:rotate,
						interval:0,
					}
				},
				grid:[{
					bottom:"10%",
					left:"5%",
					width:'90%',
					height:"70%",
					containLabel:true,
				}],
				legend:{
					show:legend,
					data:keys.slice(1,keys.length),
					right:"5%",
					top:8,
				},
				yAxis:{
					type:'value',
					splitLine: {lineStyle:{type:'dashed'}},
					axisLine:{show:false},
					axisTick:{show:false},
					axisLabel:{
						color:"#919aa5",
						fontSzie:fsize,
					}
				},
				series:series,
			}
			if(!!self.option.backgroundBar){
				opt.series.unshift({
					type:'bar',
					data:maxs,
					barWidth:40,
					barGap:"-100%",
					yAxisIndex:1,
					xAxisIndex:1,
					itemStyle:{
						normal:{
							fontSzie:fsize,
							color:"#F2F5F8",
						},
						emphasis:{
							fontSzie:fsize,
							color:"#F2F5F8",
						}
					},
					z:1,
					tooltip:{
						show:false,
					}
				})
				var yAxis=[],xAxis=[]
				yAxis.push(opt.yAxis)
				yAxis.push({
					type:'value',
					show:false,
					max:maxs[0],
					axisLabel:{
						color:"#919aa5",
						fontSzie:fsize,
						formatter:"null",
					}
				})
				opt.yAxis = yAxis
				xAxis.push(opt.xAxis)
				xAxis.push({
					type:'category',
					show:false,
				})
				opt.xAxis = xAxis
				if(self.option.percent == true){
					opt.yAxis.forEach(function(item,index){
						item.axisLabel["formatter"]='{value}%'
					})
				}		
			}
				// 判断是否为横向柱图，改变相应配置
			if( cross == true){
				opt.xAxis={
					type:"value",
					axisLine:{
						lineStyle:{
							color:"#d9d9d9"	
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color:"#919aa5",
						rotate:rotate
					},
					splitLine: {show:false},
				}
				opt.yAxis={
					type:"category",
					data:xData[0],
					axisLine:{
						lineStyle:{
							color:"#d9d9d9"	
						}
					},
					axisLabel:{
						color:"#919aa5",
						fontSzie:fsize,
					},
					axisTick:{show:false},
					splitLine: {show:false},
				}
				if(self.option.cross == true){
					opt.xAxis.axisLabel["formatter"]=function(value){
						if(value<0){
							value = 0- value
						}
						if(self.option.percent == true){
							value=value+"%"
						}
						return value
					}
				}
			}else{
				if(self.option.backgroundBar){
					opt.xAxis.forEach(function(item,index){
						item.data = xData[0]
					})
				}else{
					opt.xAxis.data=xData[0]
				}
				
				if(self.option.percent == true && !self.option.backgroundBar){
					opt.yAxis.axisLabel["formatter"]='{value}%'
				}
			}
			var charts = ec.init(document.getElementById(self.option.obj+'_probarBox'));
	  		charts.setOption(opt);
	  		charts.on('click',function(params){
	  			var x = params.event.target.shape.x
	  			if(typeof self.option.addClick =="function"){
	  				self.option.addClick(x)
	  			}
	  		})
		}
	}
	promotionBar.prototype.constructor = promotionBar
	return promotionBar
})