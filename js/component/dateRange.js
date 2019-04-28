define(['jquery','commonData','datetimePicker','layDate'],function($,commonData,datetimepicker,layDate){
	function dateRange(option){
		var _option = $.extend({
					data:[]
				},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	dateRange.prototype={
		init:function(option){
			var self = this,
				ind = self.option.obj,
				startValue = self._notDefined(self.option, 'starValue') ? self.option.starValue : '',
				endValue = self._notDefined(self.option, 'endValue') ? self.option.endValue :'',
				format = self._notDefined(self.option, 'format') ? self.option.format : "Y/m/d",
				minDate = self._notDefined(self.option, 'minDate') ? self.option.minDate : false,
				maxDate = self._notDefined(self.option, 'maxDate') ? self.option.maxDate : false,
			 div='<div class="Box wid timeBox" id="'+self.option.obj+'_dateRange">'
				+'<div class="Box wid timeInner">'
				+'<div class="startDate position float"><div class="timeInput" id="start'+ind+'"><input type="text" class="Box wid" id="'+self.option.obj+'_datePicker" readonly/></div><span><i class="iconfont icon-rili timeIcon"></i></span></div>'
				+'<div class="timeMidder float">—</div>'
				+'<div class="endDate position float"><div class="timeInput" id="end'+ind+'"><input type="text" class="Box wid" id="'+self.option.obj+'_datePicker" readonly/></div><span><i class="iconfont icon-rili timeIcon"></i></span></div>'
				+'</div></div>'
			$("#"+self.option.obj).empty().append(div)	
			var height = $("#"+self.option.obj+' #'+self.option.obj+'_dateRange').height()
			$('#'+self.option.obj+' .position').css({
				"padding-right":'20px'
			})
			$('#'+self.option.obj+' .timeMidder').css({
				"line-height":height+'px'
			})
			$('#'+self.option.obj+' .position .timeIcon').css({
				right:0,
				"line-height":height+'px'
			})
			var endDate,startDate,s1,e1
			if(!!maxDate){
				endDate = maxDate
				if(!!endValue){if(self.getTime(endValue)>self.getTime(maxDate))endDate = endValue}
			}
			if(!!minDate){
				startDate = minDate;
				if(!!startValue){if(self.getTime(startValue)<self.getTime(minDate))startDate =startDate;}
			}
			if(!!endValue){
				endDate = endValue
				if(!!maxDate){if(self.getTime(endValue)<self.getTime(maxDate)){endDate = maxDate}}
			}
			if(!!startValue){
				startDate = startValue;
				if(!!minDate){if(self.getTime(startValue)>self.getTime(minDate))startDate =minDate;}	
			}
			layDate.render({
				elem:'#start'+self.option.obj,
				trigger:'click',
				lang:'ch',
				showBottom: false,
				type:self.option.dateType||'date',
				value:startDate.replace(/\//g,'-'),
				max:endDate.replace(/\//g,'-'),
				done:function(value){
					startDate=value
				}
			})
			layDate.render({
				elem:'#end'+ind,
				trigger:'click',	
				lang:'ch',
				showBottom: false,
				type:self.option.dateType||'date',
				value:endDate.replace(/\//g,'-'),
				max:endDate.replace(/\//g,'-'),
				min:startDate.replace(/\//g,'-'),
				done:function(){}
			})
		},
		_notDefined: function(list, key) {
			if (typeof list[key] != 'undefined' && list[key] != '') {
				return true;
			} else {
				return false;
			}
		},
		getTime:function(time){return new Date(time).getTime()}
	}
	dateRange.prototype.constructor = dateRange
	return dateRange
})