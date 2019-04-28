define(['ec','jquery','require'],function(ec,$,require){
	function radar(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	radar.prototype={
		init:function(option){
			var self= this
			$("#"+self.option.obj).empty().append('<div class="wid Box" id="'+self.option.obj+'_radar"></div>')
			var title = typeof self.option.title!=='undefined' && self.option.title !==''? self.option.title :''
			self.data = self.option.data
			var ind=[],newData=[],indicators=[]
			for(var i = 0;i<self.data.length;i++){
				ind.push(self.data[i][0])
				newData.push(+self.data[i][1])
			}
			var max = Math.max.apply(null,newData)*1.1
			for(var i=0;i<ind.length;i++){
				indicators.push({
					name:ind[i],
					max:max
				})
			}
			var  opt={
				title:{
					text:title,
					top:"2.5%",
					left:"5%"
				},
				// tooltip:{},
				radar:{
					indicator:indicators,
					splitNumber:3,
					splitArea:true,
					center:['50%',"50%"],
					radius:"55%",
					nameGap:6,
				},
				color:['#216d98'],
				series:[{
					type:'radar',
					data:[{value:newData}],
					symbol:'circle',
				}]
			}
			var charts = ec.init(document.getElementById(self.option.obj+'_radar'));
            charts.setOption(opt);
		}
	}
	radar.prototype.constructor = radar
	return radar
})