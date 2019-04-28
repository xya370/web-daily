define(['jquery','require','bootstrap','fileInput','fileInputZH'],function($,require,bootstrap,fileInput,fileInputZH){
	function inputs(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	inputs.prototype={
		init:function(option){
			var self=this,
			label=self.option.label !=='' && typeof self.option.label !=='undefined'?self.option.label:'';
			self.inputType = self.option.inputType !=='' && typeof self.option.inputType !=='undefined' ?self.option.inputType :'text'
			self.labelWid = self.option.labelWidth !=='' && typeof self.option.labelWidth !=='undefined'? self.option.label:'100'
			var div='<div class="wid Box forms" id="formsBox"><div class="formInner"><div class="formLabel"><label>'
				+label+'</label></div><div class="formInput"><div class="innerInput"><input type="'+self.inputType+'"  class="wid Box"/></div></div></div></div>'
			$('#'+self.option.obj).empty().append(div)
			var width = $('#'+self.option.obj).width()
			$('#'+self.option.obj+' .formInput').css({"width":(width-self.labelWid)+'px',float:"left",
			})
			$('#'+self.option.obj+' .formLabel').css({width:self.labelWid+'px',float:"left"})
			self._setText()
			self.onClick()
		},
		_setText:function(){
			var self = this,data= self.option.data,temp=''

			switch(self.inputType){
				case 'select':
					temp='<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'
					for(var i =0 ;i<data.length;i++){
						temp +='<li><a href="javascript:void(0)">'+data[i]+'</a></li>'
					}
					var div = '<div class="dropdown">'
						 	+'<button class="btn btn-default dropdown-toggle inBtn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
						  	+'<span class="btnValue">请选择：</span><span style="position:relative;left:25px;"><i class="iconfont icon-icon_on_the_down"></i></span></button>'
						    +temp
						 	+ '</ul></div>'
					$('#'+self.option.obj+' .innerInput').empty().append(div)
					var minLength = $('#'+self.option.obj+' .innerInput .btnValue').width(),wids=[],max
					wids.push(minLength)
					$("#"+self.option.obj+' .innerInput li').each(function(index,item){
		                wids.push($(item).width());
		                max=Math.max.apply(null,wids);
		            });
					$('#'+self.option.obj+' .innerInput .btnValue').width(max+'px')
				;break;
				case 'text':
					var div = '<div class="input-group" style="width:25%;"><input type="text" class="form-control" placeholder="" aria-describedby="basic-addon2"></div>'
					$('#'+self.option.obj+' .innerInput').empty().append(div)
				;break;
				case 'radio':
					var name = self.option.label,div
					for(var i=0;i<data.length;i++){
						temp+='<input type="radio" name="'+name+'" id="radio_'+i+'" />  '+data[i]+'&nbsp;&nbsp;&nbsp;'
					}
					div='<div class="inputRadio wid Box">'+temp+'</div>'
					$('#'+self.option.obj+' .innerInput').empty().append(div)
				;break;
				case 'textArea':
					var col = self.option.col!=='' && typeof self.option.col !=='undefined'?self.option.col:50;
					var row = self.option.row!== '' && typeof self.option.row !=='undefined'?self.option.row:4;
					$('#'+self.option.obj+' .innerInput').css('height','auto')
					$('#'+self.option.obj+' .formInner').css('height','auto')
					var div = '<div class="inputTextArea"><textarea name="'+self.option.label+'" id="textArea_'+self.option.obj+'" cols="'+col+'" rows="'+row+'"></textarea></div>'
					$('#'+self.option.obj+' .innerInput').empty().append(div)
				;break;
				case 'image':
					$('#'+self.option.obj+' .innerInput').css('height','auto')
					$('#'+self.option.obj+' .formInner').css('height','auto')
					var div='<div class="imageBox"><span class="imgSpan"><i class="iconfont icon-jia"></i></span></div><div class="row"><input id="file-Portrait1" type="file"></div>'
					$('#'+self.option.obj+' .innerInput').empty().append(div)
					self.initFileInput("file-Portrait1", "/User/EditPortrait");
					var wid = $('#'+self.option.obj+' .imageBox').width()
					var hig=$('#'+self.option.obj+' .imageBox').height()
					$('#'+self.option.obj+' .imageBox .iconfont').css({'line-height':hig+'px'})
					$('#'+self.option.obj+' .innerInput .file-preview ').css({'width':wid+'px'})
					$('#'+self.option.obj+' .innerInput .file-preview .file-drop-zone-title').text('')
					document.getElementsByClassName('btn-file')[0].childNodes[2].nodeValue="更换头像"
					$('#'+self.option.obj+' .innerInput .btn-file').css({
						color:'#40A2E1'
					}).addClass('btnAdd').find('i').css({display:'none'})

				;break;
			}
		},
		onClick:function(){
			var self = this,data= self.option.data
			switch(self.inputType){
				case 'select':
					$('#'+self.option.obj+' .innerInput').off().on('click','ul',function(e){
						var text = $(e.target).text()
						$('#'+self.option.obj+' .innerInput .btnValue').text(text)
					})
				;break;
				case 'image':
					$('#'+self.option.obj+' #file-Portrait1').on('filebatchselected',function(){
						$("#"+self.option.obj+' .imageBox').css({'display':'none'})
					}).on('fileclear',function(){
						var style = $("#"+self.option.obj+' .imageBox').css("display")
						if(style=="none"){$("#"+self.option.obj+' .imageBox').css("display",'')}
					})
				;
			}
		},
		initFileInput:function(ctrlName, uploadUrl) { 
			 var control = $('#' + ctrlName); 
				 control.fileinput({
					 language: 'zh', //设置语言
					 uploadUrl: uploadUrl, //上传的地址
					 allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
					 showUpload:true, //是否显示上传按钮
					 showCaption: false,//是否显示标题
					 browseClass: "btn", //按钮样式 
					 dropZoneEnabled:false,
					 previewFileIcon: "<i class='glyphicon glyphicon-king'></i>", 
				});
		}
	}
	inputs.prototype.constructor = inputs
	 return inputs
})