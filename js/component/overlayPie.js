define(['ec','jquery','require','commonData'],function(ec,$,require,commonData){
	function overlayPie(option){
		var _option = $.extend({
			data:[]
		},option);
		let self=this;
		self.init(_option);
	}
	overlayPie.prototype={
		init:function(option){
			let self = this;
			$('#'+option.areaId).empty();
			if(!!option.data && option.data.length!=0){
				self.setdata(option);
			}
		},
		setdata:function(option){
			let self = this;
			let inopt=commonData.newData(option.data);
			self.opt = {
				areaId:option.areaId,
				rads:option.rads,
				data:[]
			}
			for(let key in inopt.data){
				self.opt.data.push(inopt.data[key]);
			}
			if(!!inopt.title)self.opt.title = inopt.title
			if(self.opt.data.length==1){
				self.opt.leg = false;
			}else{self.opt.leg = true;}
			self.setcon();
		},
		setcon:function(){
			let self = this,divwid = !!self.opt.leg?81:100,undiv = divwid/(+self.opt.data.length),hunnum = 100,rads = self.opt.rads || [[0,'53%'],[0,'56%'],[0,'59%']],
				realpie = [{
					color:'#e8b343'
				},{
					color:'#4cecb2',
					opacity:0.8
				},{
					color:'#34ccd3',
					opacity:0.8
				}],fonts = $('#'+self.opt.areaId).width()*0.03,divhei = $('#'+self.opt.areaId).height()*0.04;
			$('#'+self.opt.areaId).append('<div class="hunsty dispie clearfix"></div>');
			let conshow = self.opt.leg,labs = {},labline = {},listrs = '';
			//显示图例
			if(!!conshow){
				labs = {show:false};
				labline = {show:false};
			}else{
				labs = {
			       	textStyle:{
			        	color:'#feba52',
			       	},
			       	formatter:function(params){
			        	return '{text|'+params.name+'}\n{value|'+params.percent+'%}'
			       	},
			       	rich:{
			        	text:{
			         		color:"#fff",
			         		fontSize:fonts,
			         		fontFamily:'Microsoft YaHei'
			        	},
				        value:{
					        color:'#feba52',
					        fontSize:fonts*1.5,
					        fontFamily:'Microsoft YaHei'
				        }
			       }
			    };
			    labline = {
					show:true,
					length:25,
					length2:0,
					lineStyle:{
						color:'#fff'
					}
				}
			}
			self.opt.data.forEach(function(item,index){
				hunnum -= undiv;
				$('#'+self.opt.areaId).find('.dispie').append('<div class="disinn" id="overp'+index+'" style="width:'+undiv+'%;"></div>');
				let inchar = ec.init($('#'+self.opt.areaId).find('#overp'+index).get(0)),ecopt = {
					series:[{
						type:'pie',
						center:['50%','55%'],
						radius:rads[0],
						data:[{
							value:1,
							itemStyle:{
								normal:{color:'#e8b544'}
							}
						}],
						labelLine:{
							normal:{show:false},
							emphasis:{show:false}
						}
					}]
				};
				if(!!item.data && item.data.length!=0){
					let preval = 0;
					item.data.forEach(function(ite,ind){
						let indas = [],names = ite.itemName || '',invals = (+ite.itemValue) || 0;
						if(index==0){
							listrs += '<li><span class="legblock" style="display:inline-block;width:'+divhei+'px;height:'+divhei+'px;background-color:'+realpie[ind]['color']+';"></span><span style="font-size:'+fonts*0.04+'px;padding-left:3px;color:#fff;">'+names+'</span></li>';
						}
						if(preval!=0){
							indas.push({
								name:'',
								value:preval,
								itemStyle:{
									normal:{color:'#fff0'}
								},
								labelLine:{
									normal:{show:false},
									emphasis:{show:false}
								}
							})
						}
						//真正显示颜色数据部分
						indas.push({
							name:names,
							value:invals,
							itemStyle:{
								normal:realpie[ind]
							},
							label:{
								normal:labs,
								emphasis:labs
							},
							labelLine:{
								normal:labline,
								emphasis:labline
							}
						});
						preval += invals;
						if(preval!=1){
							indas.push({
								name:'',
								value:1-preval,
								itemStyle:{
									normal:{color:'#fff0'}
								},
								labelLine:{
									normal:{show:false},
									emphasis:{show:false}
								}
							})
						}
						ecopt.series.push({
							type:'pie',
							center:['50%','55%'],
							hoverAnimation:false,
							radius:rads[ind],
							data:indas
						});
					})
				}
				inchar.setOption(ecopt);
				if(!!self.opt.leg){
					$('#'+self.opt.areaId).find('#overp'+index).append('<div style="color:#cdcdce;font-size:'+fonts*0.1+'px;" class="inpname">'+item.name+'</div>')
				}
			})
			if(!!self.opt.leg){
				// hunnum
				$('#'+self.opt.areaId).find('.dispie').append('<div class="disinn" style="width:'+hunnum+'%;"><ul class="prelegs">'+listrs+'</ul></div>');
			}
			if(!!self.opt.title){
				$('#'+self.opt.areaId).find('.ectit').remove();
				$('#'+self.opt.areaId).find('.dispie').append('<div style="color:#fff;font-size:'+fonts*1.8+'px;" class="ectit">'+self.opt.title+'</div>');
			}
		}	
	}
	overlayPie.prototype.constructor = overlayPie;
	return overlayPie;
})