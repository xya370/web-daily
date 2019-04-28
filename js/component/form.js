define(['jquery','require','inputs','Module'],function($,require,inputs,Module){
	function form(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	form.prototype={
		init:function(option){
			var self = this
			var data= self.option.data,formInd=self.option.obj,cols=0
			$('#' + self.option.obj).html('<form id="'+ formInd +'_forms" class="forms" enctype="multipart/form-data"></form>');
			for(var i =0;i<data.length;i++){
				if (self.option.data[i] != undefined && self.option.data[i].length > cols) {
					cols = self.option.data[i].length;
				}
			}
			var widPar = $('#' + self.option.obj).width();
			var widItem = (1 / cols * 100).toFixed(6) + '%';
			var labelWidth = typeof self.option.labelWidth != 'undefined' ? self.option.labelWidth : '';
			var maxCols = 0;
			for (var i = 0; i < self.option.data.length; i++) {
				if (self.option.data[i] != undefined) {
					for (var j = 0; j < self.option.data[i].length; j++) {
						if (typeof self.option.data[i][j].cols != 'undefined' && self.option.data[i][j].cols != '') {
							if (maxCols < self.option.data[i][j].cols) {
								maxCols = self.option.data[i][j].cols;
							}
						}
					}
				}
			}
			var maxW = '';
			for (var i = 0; i < self.option.data.length; i++) {
				if (self.option.data[i] == null || self.option.data[i] == undefined) {
					continue
				}
				var itemInd = 'l' + new Date().getTime() + i.toString();
				$('#'+formInd+'_forms').append('<div class="formItemCon ' + itemInd + ' clearfix"></div>');
				for (var j = 0; j < self.option.data[i].length; j++) {
					var wid = '';
					if (typeof self.option.data[i][j].labelWidth != 'undefined') {
						wid = self.option.data[i][j].labelWidth + 'px';
						labelWidth = self.option.data[i][j].labelWidth;
					} else {
						wid = labelWidth + 'px';
					}
					if (self.option.inline == true) {
						if (typeof self.option.data[i][j].cols != 'undefined' && self.option.data[i][j].cols != '' && self.option.data[i][j].cols <= cols) {
							widItem = (+self.option.data[i][j].cols / cols * 100).toFixed(6) + '%';
						} else if (self.option.data[i][j].cols > cols) {
							widItem = "100.000000%";
						}
					} else {
						widItem = '100.000000%';
					}
					var temp = '';
					self.option.data[i][j].obj = self.option.obj + '_' + self.option.data[i][j].obj;
					var heiT = '';
					if (self.option.data[i][j].inputType == 'textarea' || self.option.data[i][j].inputType == 'text') {
						heiT = 'height: auto;';
					}
					var type = '';
					if (self.option.data[i][j].type == 'inputs') {
						type = self.option.data[i][j].inputType;
					} else {
						type = self.option.data[i][j].textType != undefined && self.option.data[i][j].textType !== '' ? self.option.data[i][j].textType : self.option.data[i][j].type;
					}
					if (typeof self.option.data[i][j].labelWidth == 'undefined') self.option.data[i][j].labelWidth = labelWidth;
					
					if (typeof self.option.data[i][j].width == 'undefined') self.option.data[i][j].width = self.option.width;
					var val = typeof self.option.data[i][j].label != 'undefined' ? self.option.data[i][j].label : '';
					temp = '<div class="formItemBoxs clearfix Box' + self.option.data[i][j].obj + '" id="' + self.option.data[i][j].obj + '"></div>';
					$('.' + itemInd).append(temp);
					var opt = self.option.data[i][j];
					new Module(opt);
					
				}
			}

		},
	}
	form.prototype.constructor = form
	return form
})