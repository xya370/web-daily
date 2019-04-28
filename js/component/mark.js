define(['jquery','require','commonData'],function($,require,commonData){
	function mark(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	mark.prototype={
		init:function(option){
			var self = this,width = document.body.clientWidth,height=document.body.clientHeight
			var div = '<div class="makBtn">戳我</div>'
			var temp ='<div class="markCover" style="height:'+height+'px;width:'+width+'px"></div>'
			$('#'+self.option.obj).empty().append(div)
			$("#"+self.option.obj).parents('.customersBox').before(temp)
			$('#'+self.option.obj+' .makBtn').on('click',function(){
				self.show()
			})
			var num = (height*width)/(10*10),inli=''
			for(var i=0;i<num;i++){
				inli += '<div class="inli" style="width:10px;height:10px;float:left; id="'+i+'" ></div>'
			}
			// $('.markCover').append(inli)
		},
		show:function(){
			var self = this
			$('.markCover').css({
				'display':'block'
			})
		}
	}
	mark.prototype.constructor = mark
	return mark
})