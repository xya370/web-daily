define(['ec','jquery','require'],function(ec,$,require){
	function line(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	line.prototype={
		init:function(option){
			var self = this
			var data= self.option.data
			$("#"+self.option.obj).empty().append('<div class="Box wid" id="'+self.option.obj+'_lineBox"></div>');
			var title = typeof self.option.title !='undefined' && self.option.title!==''? self.option.title:''
			var colors = typeof self.option.colors !=='undefined' && self.option.colors !==''? self.option.colors:["#1390fd",'#23c750','#fac919'];
			var xData=[]

			for(var i=0;i<24;i++){
				if(i<10){
					xData.push('0'+i+':00')
				}else{
					xData.push(i+':00')
				}
			}
			self.legents=[]
			self.newData=[]
			for(var i =0 ;i<data.length;i++){
				self.legents.push(data[i][0])
				self.newData[i]=[];
				for(var j =1;j<data[i].length;j++){
					self.newData[i].push(data[i][j])
				}

			}

			var opt=({
				title:{
					text:title,
					top:"2.5%",
					left:"5%"
				},
				tooltip:{
					trigger:'axis',

				},
				color:colors,
				legend:{
					data:self.legents,
					top:"10%",
					right:"10%",
					itemWidth: 20,
        			itemHeight: 10,
        			itemGap: 10,
				},
				xAxis:{
					data:xData,
					axisLabel:{
						interval:0,
						rotate:30
					}
				},
				yAxis:{
					type:'value',
					splitLine: {lineStyle:{type:'dashed'}},
			    	 axisLine:{show:false},
			    	 axisTick:{show:false},
			    	 max:function(value){
			    	 	return +value.max+2
			    	 }
				},
				series:self._setSeries()
			})
			var charts = ec.init(document.getElementById(self.option.obj+'_lineBox'));
            charts.setOption(opt);
		},
		_setSeries:function(){
			var self = this,series=[]
			var data = self.option.data
			for(var i =0 ;i<data.length;i++){
				series.push({
					type:'line',
					name:self.legents[i],
					data:self.newData[i],
					 symbol:"circle"
				})
			}
			return series
		}
	}
	line.prototype.constructor = line
	 return line
})