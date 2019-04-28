define(['ec','jquery','require'],function(ec,$,require){
	function cityStack(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	cityStack.prototype={
		init:function(option){
			var self = this,title=self.option.title!=='' && typeof self.option.title !=='undefined'?self.option.title:'';
			var data = self.option.data,grids=[],xdata=[],value=[],series=[]
			var color = self.option.color !=="" && typeof self.option.color !=='undefined'?self.option.color:""
			$("#"+self.option.obj).empty().append('<div class="wid Box" id="cityStack_'+self.option.obj+'"></div>')
			var fonts = (+$('#'+self.option.obj).css('width').replace('px',''))*0.025
			//处理
			data.forEach(function(item,index){
				var i=0,inValue=[]
				for(var key in item){
					grids.push(key)
					item[key].forEach(function(ite,ind){
						xdata[ind]=ite[0]
						inValue.push(ite[1])
					})
					i++
				}
				value.push(inValue)
			})

			// 设置柱状图
			
				value.forEach(function(item,index){
					series.push({
						type:'bar',
						name:grids[index],
						data:item,
						barWidth:"30%",
						stack:'a',
					})
				})
			
			var opt = {
				title:{
					text:title,
					top:"2.5%",
					left:"5%",
					textStyle:{
						color:"#fff",
						fontSize:fonts*1.5
					}
				},
				color:color,
				tooltip:{
					tigger:"axis",
				},
				legend:{
					data:grids,
					right:"10%",
					top:"5%",
					width:100,
					icon:"rect",
					itemWidth:10,
					itemHeight:10,
					textStyle:{
						color:"#fff",
						fontSize:fonts*0.65
					}
				},
				xAxis:{
					data:xdata,
					axisLine:{show:false},
					axisTick:{show:false},
					axisLabel:{
						color:"#fff",
						fontSize:fonts
					}
				},
				yAxis:{
					type:'value',
					axisLine:{show:false},
					axisTick:{show:false},
					splitLine:{show:false},
					axisLabel:{show:false} 
				},
				series:series	
			}
			var charts = ec.init(document.getElementById('cityStack_'+self.option.obj));
    		charts.setOption(opt);		
		}
	}
	cityStack.prototype.constructor = cityStack
	return cityStack
})