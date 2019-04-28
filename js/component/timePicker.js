define(['jquery','commonData','layDate'],function($,commonData,layDate){
	function timePicker(option){
		var _option = $.extend({
					data:[]
				},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	timePicker.prototype={
		init:function(option){
			var self = this
			var div = '<div class="Box wid timeBox" id="'+self.option.obj+'_timeBox">'
					+'<div class="Box wid timeInner position">'
					+'<div class="timeInput"><input type="text" class="Box wid" id="'+self.option.obj+'_datetimePicker" readonly/></div></div></div>'
			$("#"+self.option.obj).empty().append(div)
			var position= self.option.onshow == true?'static':'';
			if(self.option.onshow==true){
				$("#"+self.option.obj+"_timeBox .timeInner").hide()
			}
			var render={
				elem:self.option.onshow == true?"#"+self.option.obj+"_timeBox":"#"+self.option.obj+"_timeBox input",
				position:position,
				type:self.option.dateType||'date',
				theme:'#00a4ed',
				showBottom: false,
				done:function(value,date,endDate){
					if(!!self.option.callbackClick && typeof self.option.callbackClick =='function'){
						self.option.callbackClick(value)
					}
				}
			}	
			layDate.render(render)
			
		},
	}
	timePicker.prototype.constructor = timePicker
	return timePicker
})