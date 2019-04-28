define(['ec','jquery','require','commonData'],function(ec,$,require,commonData){
	function cityLine(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	cityLine.prototype={
		init:function(option){
			var self = this,data=commonData.newData(self.option.data)
			self.option.title = data.title!=='' && typeof data.title !=='undefined' ?  data.title :self.option.title;
			var title = self.option.title !=='' && typeof self.option.title !=='undefined'?self.option.title:''
			var colors = !!self.option.color ?self.option.color:['#3294de'];
			var div ='<div class="wid Box ecBox"><div class="wid Box" id="cl_'+self.option.obj+'"></div></div>'
			$("#"+self.option.obj).empty().append(div)
			var fonts = (+$('#'+self.option.obj).css('width').replace('px',''))*0.03,idata = self.setValue(data.data),grids=[],iName=[],value=[],maxNum=[]
			var indicators=[],series=[]
			var smooth = self.option.smooth ==false?false:true
			var axis = self.option.axis == false ? false:true

			// 数据处理
			idata.forEach(function(item,index){
				var inValue=[]
				for(var key in item){
					grids.push(key)
					item[key].forEach(function(ite,ind){
						inValue.push(ite[1])
						iName[ind]=ite[0]
					})
				}
				value.push(inValue)
			})
			for(var i =0 ;i<idata.length;i++){
				series.push({
					type:'line',
					data:value[i],
					symbol:"none",
					smooth:smooth,
					areaStyle:{
						normal:{
							opacity:0.3
						}
					}
				})
			}
			var opt = {
				grid:{
					containLabel:true,
					top:'25%',
					bottom:'10%'
				},
				tooltip:{
					show:false,
					trigger:'axis',
				},
				color:colors,
				xAxis:{
					data:iName,
					boundaryGap:false,
					axisLabel:{
						rotate:30,
						color:"#d5d5d5",
						fontSize:fonts,
						fontFamily:'Microsoft YaHei'
					},
					axisLine:{
						show:axis,
			        	lineStyle:{
			        		color:"rgba(87,87,88,0.5)"	
			        	}
			        },
					axisTick:{show:false}
				},
				yAxis:[{
					type:'value',
					offset:10,
					axisLine:{
						show:axis,
			    	 	lineStyle:{
			    	 		color:'rgba(87,87,88,0.5)'
			    	 	},
			    	 },
			    	 splitLine:{
			    	 	lineStyle:{
			    	 		color:'rgb(45,45,46)'
			    	 	}
			    	 },
			    	 axisTick:{show:false},
			    	 axisLabel:{
			    	 	color:"#d5d5d5",
			    	 	fontSize:fonts,
						fontFamily:'Microsoft YaHei',
			    	 	formatter:function(value){
			    	 		var val
			    	 		if(typeof(value)=='number' && value>10000){
			    	 			var num =(value/10000).toFixed(1)
			    	 			val =num+'万'
			    	 		}else{
			    	 			val = value
			    	 		}
			    	 		return val
			    	 	}
			    	 }
				},{
					type:'value',
					show:false,			
				}],
				series:series
			}
			var charts = ec.init(document.getElementById('cl_'+self.option.obj));
            charts.setOption(opt);
            if(!!title){
            	$('#'+self.option.obj+' .ecBox').append('<div class="wid title">'+title+'</div>')
            	$('#'+self.option.obj+' .title').css({				 
					'font-size':fonts*1.8+'px',
				})
            }
		},
		setValue:function(data){
			var newValue =[]
			for(var item in data){
				var value=[],dat=data[item]
				var name = dat['name']
				dat['data'].forEach(function(item,index){	
					var inValue = []
					inValue.push(item.itemName)
					inValue.push(item.itemValue)
					value.push(inValue)	
				})
				var m={}
				m[name]=value
				newValue.push(m)
			}
			return newValue
		}
	}
	cityLine.prototype.constructor = cityLine
	return cityLine
})