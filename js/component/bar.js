define(['ec','jquery','require'],function(ec,$,require){
	function bar(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	bar.prototype={
		init:function(option){
			var self= this
			$("#"+self.option.obj).empty().append('<div class="wid Box" id="'+self.option.obj+'_barBox"></div>')
			var title = typeof self.option.title!=='undefined' && self.option.title !==''? self.option.title :''

			var data = self.option.data
			var cross = self.option.cross == true ? true:false;
			var xData=[],newData = [],pointData=[]
			var barWid = self.option.cross == true ? 5:20;

			for(var i=0;i<data.length;i++){
				xData.push(data[i][0])
				newData.push(+data[i][1])
			}

			// 处理数据，改变数据以比例形式展示
			var total = Math.max.apply(null,newData)*1.1
			for(var m =0;m<newData.length;m++){
				var n = (+newData[m]*100)/total
				pointData.push(n)
			}
			var dataT = self.option.percent == true ?pointData:newData;
			// 柱图基本设置
			var opt={
				title:{
					text:title,
					top:"2.5%",
					left:"5%"
				},
				tooltip:{
					tigger:"axis",
					formatter:function(params){
						return newData[params.dataIndex]
					}
				},
				 xAxis: {
			        axisLine:{},
			        axisTick:{},
			        axisLabel:{
			        	color:"#667282",
			        }
			    },
			    grid:{
			    	top:"20%",
			    	bottom:"15%",
			    	left:"20%"
			    },
			    yAxis:{
			    	 splitLine: {lineStyle:{type:'dashed'}},
			    	 axisLine:{show:false},
			    	 axisTick:{show:false},
			    	 axisLabel:{
			    	 	color:"#667282"
			    	 }
			    },
				series:[{
					type:'bar',
					data:dataT,
					stack:'a',
					barWidth:"40%",
					itemStyle:{
						normal:{
							color:"#40A2E1"
						}
					},

				}]
			}

			// 判断是否为横向柱图，改变相应配置
			if( cross == true){
				var div='';
				for(var i=0;i<data.length;i++){
					div +='<div class="barCol"><div class="colIcon">'+data[i][0]
					+'</div><div class="colNum"><div class="barNum"><span class="barTotal">'+data[i][1]+'</span></div></div></div>'
				}
				$("#"+self.option.obj+' #'+self.option.obj+'_barBox').append(div)
				var cols = $("#"+self.option.obj+' #'+self.option.obj+'_barBox').find('.barNum')
				var height= $("#"+self.option.obj+' #'+self.option.obj+'_barBox').height()
				$("#"+self.option.obj+' .barCol').css("height",(height/data.length)+"px")
				for(var m=0;m<cols.length;m++){
					var wid = pointData[m].toString().split('.')[0]+'%'
					$(cols[m]).css('width',wid)
				}
				var h1 =$("#"+self.option.obj+' #'+self.option.obj+'_barBox .colNum').height()
				
				var h2 =$("#"+self.option.obj+' #'+self.option.obj+'_barBox  .barNum').height()
				$("#"+self.option.obj+' .colNum').css('padding-top',(h1-h2)/2+'px')
			}else{
				opt.xAxis.type='category';opt.yAxis.type='value'
				opt.xAxis.data=xData
				if(self.option.percent == true){
					opt.yAxis.axisLabel.formatter='{value}%'
				}
				var charts = ec.init(document.getElementById(self.option.obj+'_barBox'));
            	charts.setOption(opt);
			}

			
		}
	}
	bar.prototype.constructor = bar
	return bar
})