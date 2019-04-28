define(['jquery','require'],function($,require){
	function pagintor(option){
		var _option = $.extend({
			data:[]
		},option)
		var self = this
		self.option =_option
		self.init(_option)
	}
	pagintor.prototype={
		init:function(option){
			var self =this,lang=!!self.option.lang?self.option.lang:'ch'
			$('#'+self.option.obj).empty().append('<div class="wid Box pagintor-box"><div class="pagintor-main"></div></div>')
			var div = '<div class="pagintor-left"><button type="buttom" class="pagintor-pve">上一页</button></div>',num = parseInt(self.option.total/self.option.pageSize),temp='<div class="pagintor-pages">'
			for(var i=1;i<num;i++){
				temp +='<span><i>'+i+'</i></span>'
			}
				temp+='</div>'
			div +=temp
					+'<div class="pagintor-right"><button type="button" class="pagintor-next">下一页</button></div>'
			$('#'+self.option.obj+' .pagintor-main').append(div)
		}
	}
	pagintor.prototype.constructor = pagintor
	return pagintor
})