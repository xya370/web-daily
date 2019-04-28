define([ 'ec', 'jquery', 'require' ],function(ec, $, require) {
	function zheMap(option) {
		var _option = $.extend({
			data : []
		}, option);
		var self = this
		self.option = _option
		self.init(_option)
	}
	zheMap.prototype = {
		init : function(option) {
			var self = this;
			$('#' + self.option.obj).empty().append('<div id="zheMap-Box" class="Box wid" style="position:relative"><div class="Box wid" id="'+ self.option.obj+ '_mainMap" style="position:relative;"></div></div>')
			self.setMap();
			$('#' + self.option.obj + ' #zheMap-Box').append('<div class="mapImg " style="width:100%;position:absolute;bottom:10px;"><img src="" alt="" /></div>')
		},
		setMap : function() {
			var self = this;
			var baseUrl = 'http://' + window.location.host + '/';
			$.get(baseUrl + 'js/data/zhejiang.json', function(zhejson) {
				ec.registerMap('浙江', zhejson)
				var color = self.option.color|| [ '#a1d3f5', '#6cb8ea', '#66b6ee','#aedbf5', '#a1d3f5', '#6fbaee','#acd9f6', '#69b4ee', '#7dc0f2','#a4d8f8', '#7ebff0' ]
				var myChart = ec.init(document.getElementById(self.option.obj + '_mainMap'))
				var zheData = [],idata=[],corData=[],city=self.option.city
				var selected = self.option.selected||'杭州市';
				zhejson.features.forEach(function(item, index) {
					var pot = {
						name : item.properties.name,
						value:!!city[item.properties.name]&& typeof city[item.properties.name] !=='undefined'?city[item.properties.name]:"",
						itemStyle : {
							normal : {
								areaColor :color[index],
								borderColor : "#fff",
								borderWidth : 2,
							},
							emphasis:{
								areaColor : "#fbb357",
								borderColor : "#fff",
								borderWidth : 2,
								showLegendSymbol:true,
							}
						}
					}
					var icor={
						name : item.properties.name,
						coord:item.properties.cp,
						value:!!city[item.properties.name]&& typeof city[item.properties.name] !=='undefined'?city[item.properties.name]:"",
					}
					if (item.properties.name == selected) {
						pot.selected = true
						icor.selected=true
					}
					zheData.push(pot)
					corData.push(icor)
				})
				option = {
					series : [{
						type : 'map',
						name : 'zhejiangMap',
						mapType : "浙江",
						data :zheData,
						aspectScale:0.85,
						itemStyle:{
						    normal:{label:{show:false}},
						    emphasis:{label:{show:false}}
						},
						markPoint:{ 
							symbol:'image://../img/point2.png',
							symbolSize:15,
							data:corData,
							label: {
	                            normal: {
	                                formatter: '{b}',
	                                position:['-15','14'],
	                                show: true,
	                                color:"#354657",
	                                fontWeight:"bold",
	                                fontFamily:"Microsoft YaHei",
	                            },
	                            emphasis:{
	                                formatter: '{b}',
	                                position:['-15','14'],
	                                show: true,
	                                color:'#354657',
	                                fontWeight:"bold",
	                                fontFamily:"Microsoft YaHei",
	                            }
	                        },
						}
					}]
				}
				myChart.setOption(option)
				myChart.on('click', function(params) {
					params.data.selected = true
					var ipot = myChart.getOption()
					ipot.series[0].data.forEach(function(item, index) {
						if (item.name !== params.name) {
							item.selected = false
						}
					})
					myChart.setOption(ipot)
				})
			})
		}
	}
	zheMap.prototype.constructor = zheMap
	return zheMap
})