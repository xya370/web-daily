define(['ec','jquery','require'],function(ec,$,require){
	function pie(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	pie.prototype={
		init:function(option){
			var self = this
			var data= self.option.data
			$("#"+self.option.obj).empty();
			var title = typeof self.option.title !='undefined' && self.option.title!==''? self.option.title:''
			var colors=["#ff3399",'#4ca3ee']
			var div = '<div class="Box wid" id="'+self.option.obj+'_pieBox"></div>'
			$("#"+self.option.obj).html(div);
			var newData = self._setData()
			var opt=({
				title:{
					text:title,
					top:"2.5%",
					left:"5%"
				},
				color:colors,
				legend:{
					show:true,
					data:newData,
					width:50,
					top:"50%",
					right:'10%',
					formatter: function (name) {
						var val
						newData.forEach(function(item,index){
							if(item.name==name)val=name+'  '+item.value+'%'

						})
					   return val
					}
				},
				series:[{
					type:"pie",
					radius:['45%','55%'],
					data:newData,
					center:["50%","60%"],
					hoverAnimation: false,
					label:{
						normal:{
							textStyle:{
								color:"#000"
							},
							padding:[0,-35,25,-35],
							formatter:'{b}  {d}%'
						}
					},
					labelLine:{
						normal:{
							length2:35,
						}
					}
				}]
			})
			var charts = ec.init(document.getElementById(self.option.obj+'_pieBox'));
            charts.setOption(opt);
		},
		_setData:function(){
			var self = this;
			var data = self.option.data
			var newData=[]
			for(var i =0;i<data.length;i++){
				var j =0;
				for(var item in data[i]){
					newData.push({value:data[i][item],name:item})
					j++
				}
			}
			return newData

		}
	}
	pie.prototype.constructor = pie
	return pie
})