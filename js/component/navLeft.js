define(['jquery','require'],function($,require){
	function navLeft(option){
		var _option = $.extend({
			data:[]
		},option);
		this.init(_option)
	}
	navLeft.prototype={
		init:function(option){
			var self=this
			self.option=option
			var data= self.option.data
			var div = '<div class="navLeft wid">'
			for(var i=0;i<data.length;i++){
				div +='<div class="leftCol firstNavBox" id="demoNav_'+data[i].id+'">'+data[i].value+'</div>'
			}
			div+='</div>'
			$("#"+self.option.obj).html(div);
		}
	}
	navLeft.prototype.constructor = navLeft
	return navLeft
})