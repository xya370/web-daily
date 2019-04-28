define(['ec','jquery','require','commonData'],function(ec,$,require,commonData){
	function cityRadar(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	cityRadar.prototype={
		init:function(option){
			var self = this
			var data = commonData.newData(self.option.data)
			self.option.title = typeof data.title !='undefined' && data.title!==''? data.title:self.option.title
			var title = !! self.option.title ? self.option.title:''
			var colors = !!self.option.color ?self.option.color:['#3294de','#db6760','#f8df66'],split= typeof self.option.split !=='undefined'&& self.option.split !==''?self.option.split:2;
			var div ='<div class="wid Box ecBox"><div class="wid Box" id="ct_'+self.option.obj+'"></div></div>'
			$("#"+self.option.obj).empty().append(div)
			var fonts = (+$('#'+self.option.obj).css('width').replace('px',''))*0.03,grids=[],iName=[],value=[],maxNum=[]
			var idata = self.setValue(data.data)
			var indicators=[],series=[],legend = self.option.legend == true ?true:false

			// 数据二次处理
			
			idata.forEach(function(item,index){
				for(var key in item){
					grids.push(key)
					item[key].forEach(function(ite,ind){
						iName.push(ite[0])
					})
				}
			})
			var newName = self.distinc(iName)

			idata.forEach(function(item,index){
				var inVal=[]
				for(var key in item){
					for(var j=0;j<newName.length;j++){
						item[key].forEach(function(ite,ind){
							if(ite[0]==newName[j]){
								inVal.push(ite[1])
							}
						})
					}
				}
				value.push(inVal)
			})

			value.forEach(function(item,index){
				var max = Math.max.apply(null,item)
				maxNum.push(max)
			})
			var aMax = Math.max.apply(null,maxNum)*1.1

			for(var i=0;i<newName.length;i++){
				indicators.push({
					name:newName[i],
					max:aMax
				})
			}
			for(var i=0;i<value.length;i++){
				series.push({
					type:'radar',
					name:grids[i],
					data:[{value:value[i]}],
					symbol:'none',
					itemStyle:{
						normal:{
							color:colors[i]
						}
					},
					areaStyle:{
						normal:{
							color:colors[i],
							opacity:0.3
						}
					}
				})
			}
			var opt = {
				tooltip:{
					show:false,
					trigger:'item',
				},		
				legend:{
					show:legend,
					data:grids,
					right:"3%",
					// top:"25%",
					width:100,
					icon:"rect",
					itemWidth:10,
					itemHeight:10,
					textStyle:{
						color:"#fff",
						fontSize:fonts*0.65,
						// fontFamily:'Microsoft YaHei'
					}
				},
				radar:{
					indicator:indicators,
					splitNumber:split,
					name:{
						color:"#dae1ea",
						fontSize:fonts,
						fontFamily:'Microsoft YaHei'
					},
					splitArea:{
						show:false,
					},
					splitLine:{
						lineStyle:{
							color:"rgba(55,62,71,0.5)"
						}
					},
					axisLine:{
						show:false
					},

					center:['50%',"55%"],
					radius:"50%",
					nameGap:6,
				},
				series:series
			}
			var charts = ec.init(document.getElementById('ct_'+self.option.obj));
            charts.setOption(opt);
            if(!!title){
            	$('#'+self.option.obj+' .ecBox').append('<div class="wid title">'+title+'</div>')
            	$('#'+self.option.obj+' .title').css({				 
					'font-size':fonts*1.8+'px',
					'font-family':'Microsoft YaHei'
				})
            }
		},
		
		// 对option初始传入值进行处理
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
		},
	// 数组去重
	distinc:function(arr){
		var result = [],i,j,len = arr.length;
		for(i = 0; i < len; i++){
		  for(j = i + 1; j < len; j++){
			   if(arr[i] === arr[j]){
			    j = ++i;
			   }
		  	}
		  result.push(arr[i]);
		 }
		 return result;
		}
	}
	cityRadar.prototype.constructor = cityRadar
	return cityRadar
})