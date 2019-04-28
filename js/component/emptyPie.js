define(['ec','jquery','require','commonData'],function(ec,$,require,commonData){
	function emptyPie(option){
		var _option = $.extend({
			data:[]
		},option);
		let self=this;
		self.init(_option);
	}
	emptyPie.prototype={
		init:function(option){
			let self = this;
			$('#'+option.areaId).empty();
			if(!!option.data && option.data.length!=0){
				let inopt = commonData.newData(option.data);
				self.opt = {
					areaId:option.areaId,
					data:[]
				};
				for(let key in inopt.data){
					self.opt.data = inopt.data[key].data;
				}
				self.opt.data = self.opt.data.slice(0,3);
				if(!!inopt.title)self.opt.title = inopt.title
				self.setcon();
			}
		},
		setcon:function(){
			let self = this,indiv = 100/(+self.opt.data.length),piecols = ['#39cec8','#46eaa6','#fed545'],rad = self.opt.rad || ['50%','75%'],fontz = $('#'+self.opt.areaId).width()*0.03;
			$('#'+self.opt.areaId).append('<div class="hunsty dispie clearfix"></div>');
			console.log(self.opt)
			self.opt.data.forEach(function(item,index){
				$('#'+self.opt.areaId).find('.dispie').append('<div class="disinn" id="piep'+index+'" style="width:'+indiv+'%;"></div>');
				let inchar = ec.init($('#'+self.opt.areaId).find('#piep'+index).get(0)),ecopt = {series:[{
					type:'pie',
					name:item.itemName || '',
					hoverAnimation:false,
					clockwise:false,
					center:['50%','55%'],
					radius:rad,
					labelLine:{
						normal:{show:false}
					},
					data:[]
				}]};
				let vals = (+item.itemValue) || 0;
				ecopt.series[0].data.push({
					value:vals,
					label:{
						normal:{
							show:true,
							position:'center',
							formatter:'{d}%',
							fontSize:fontz,
							fontFamily:'Microsoft YaHei', 
							color:'#919aa5'
						}
					},
					itemStyle:{
						normal:{
							color:piecols[index]
						}
					}
				})
				if(vals!=1){
					ecopt.series[0].data.unshift({
						value:(1-vals),
						itemStyle:{
							normal:{
								color:'#F2F5F8'
							}
						}
					})
				}
				inchar.setOption(ecopt);
				$('#'+self.opt.areaId).find('#piep'+index).append('<div style="font-size:'+fontz+'px;color:#919aa5;" class="inpname">'+item.itemName+'</div>');
			})
			if(!!self.opt.title){
				$('#'+self.opt.areaId).find('.ectit').remove();
				$('#'+self.opt.areaId).find('.dispie').append('<div style="color:#354657;font-size:'+fontz*1.8+'px;" class="ectit">'+self.opt.title+'</div>');
				$('#'+self.opt.areaId).find('.dispie .ectit').css({
					top:"8%"
				})
			}
		}	
	}
	emptyPie.prototype.constructor = emptyPie;
	return emptyPie;
})