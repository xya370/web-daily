define(['ec','jquery','require','commonData'],function(ec,$,require,commonData){
	function cityPie(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	cityPie.prototype={
		init:function(option){
			var self = this,data=commonData.newData(self.option.data)
			self.data= data.data
			$("#"+self.option.obj).empty();
			self.option.title = typeof data.title !='undefined' && data.title!==''? data.title:self.option.title
			var title = !! self.option.title ? self.option.title:''
			var colors=typeof self.option.color!=='undefined' && self.option.color !=='' ? self.option.color:['#ffa647','#70c4ff']
			var fontColor = typeof self.option.fontColor !=='undefined' && self.option.fontColor !==''?self.option.fontColor:'#ffa647'
			var div ='<div class="wid Box ecBox"><div class="wid Box" id="'+self.option.obj+'_pieBox"></div></div>'
			$("#"+self.option.obj).empty().append(div)
			var newData = self._setData(),length = newData.length,fonts = (+$('#'+self.option.obj).css('width').replace('px',''))*0.03
			if(length<=1){
				var  n = newData[0].value
				var n1 = (1-n/100)*100
				newData.push({
					value:n1,
					label:{
						normal:{show:false,},
						emphasis:{show:false}
					},
					labelLine:{
						normal:{show:false},
						emphasis:{show:false}
					}
				})
				colors.push('#1d242a')
			}
			var opt=({
				color:colors,
				series:[{
					type:"pie",
					radius:['45%',"65%"],
					data:newData,
					clockwise:false,
					center:["50%","55%"],
					hoverAnimation: false,
					label:{
						normal:{
							formatter:function(params){
								return '{text|'+params.name+'}\n{value|'+params.percent+'%}'
							},
							rich:{
								text:{
									color:"#fff",
									fontSize:fonts,
									padding:2,
									fontFamily:'Microsoft YaHei'
								},
								value:{
									color:fontColor,
									fontSize:fonts*1.5,
									fontFamily:'Microsoft YaHei'
								}
							}

						}
					},
					labelLine:{
						normal:{
							length:0,
							length2:fonts*3,
							lineStyle:{
								color:"#7a7c80",
							}
						}
					}
				}]
			})
			var charts = ec.init(document.getElementById(self.option.obj+'_pieBox'));
      charts.setOption(opt);
      if(!!title){
      	$('#'+self.option.obj+' .ecBox').append('<div class="wid title">'+title+'</div>')
      	$('#'+self.option.obj+' .title').css({				 
					'font-size':fonts*1.8+'px',
				})
      }
		},
		// 二次处理
		_setData:function(){
			var self = this;
			var data = self.setValue(self.data)
			var newData=[]
			for(var i =0;i<data.length;i++){
				for(var item in data[i]){
					newData.push({value:data[i][item],name:item})
				}
			}
			return newData
		},
		// 初级处理
		setValue:function(){
			var self= this,data = self.data,value=[]
			for(var key in data){
				var im = data[key].data
				im.forEach(function(item,index){
					var m ={}
					m[item.itemName] = +item.itemValue<1?(item.itemValue*100).toFixed(2):item.itemValue
					value.push(m)
				})
			}
			return value
		}
	}
	cityPie.prototype.constructor = cityPie
	return cityPie
})