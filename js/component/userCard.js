define(['jquery','require'],function($,require){
	function userCard(option){
		var _option = $.extend({
			data:[]
		},option);
		var self=this
		self.option=_option
		self.init(_option)
	}
	userCard.prototype={
		init:function(option){
			var self=this,data=self.option.data,userName=self.option.userName !=='' && typeof self.option.userName !=='undefined'?self.option.userName:'';
			var time = data[0].time !==''&& typeof data[0].time !=='undefined'?data[0].time:'';
			var buy = data[0].buy !==''&& typeof data[0].buy !=='undefined'?data[0].buy:'';
			var name = data[0].name!==''&& typeof data[0].name !=='undefined'?data[0].name:'';
			var sale = data[0].sale !==''&& typeof data[0].sale !=='undefined'?data[0].sale:'';
			var level = data[0].level !==''&& typeof data[0].level !=='undefined'?data[0].level:'';
			var adress = data[0].adress !==''&& typeof data[0].adress !=='undefined'?data[0].adress:'';
			var male = data[0].male !==''&& typeof data[0].male !=='undefined'?data[0].male:'';
//			sale = sale.toString().replace(/([-+]?\d{3})(?=\d)/g, function($0, $1) {
//	            return $1 + ",";
//	        });
			var div='<div class="userCard"><div class="uCardTitle">'
			if( userName !=='' ){
				div +='<div class="uCardImg"></div><div class="uCardN"><span class="uN" style="font-size:16px;">用户名'+"&nbsp;&nbsp"+userName+' </span><span class="uLe">星级信息/基本信息</span></div>'
					 +'<div class="uCardOther"><div class="other uTime uborder"><span class="uN">停留时长</span><span class="userNum">'+time+'</span></div>'
					 +'<div class="other uBuy uborder"><span class="uN">购买次数</span><span class="userNum">'+buy+'</span></div>'
					 +'<div class="other uSale uborder"><span class="uN">消费金额</span><span class="userNum">¥'+sale+'</span></div></div>'
					 +'</div><div class="uCardIm">'
					 +'<div class="imcol">'
					 +'<div class="imC1"><div class="colLabel">姓名</div><div class="colText">'+name+'</div></div>'
					 +'<div class="imC1"><div class="colLabel">星级</div><div class="colText">'+level+'</div></div></div>'
					 +'<div class="imcol">'
					 +'<div class="imC1"><div class="colLabel">性别</div><div class="colText">'+male+'</div></div>'
					 +'<div class="imC1"><div class="colLabel">地址</div><div class="colText">'+adress+'</div></div></div></div>'
			}else{
				div +='<div class="uCardImg"></div><div class="uCardN"><span class="uN" style="font-size:16px;">用户名'+"&nbsp;&nbsp"+userName+' </span><span class="uLe">星级信息/基本信息</span></div>'
					 +'<div class="uCardOther"><div class="other uTime uborder"><span class="uN">停留时长</span><span class="userNum">'+time+'</span></div>'
					 +'</div>'
					 +'</div><div class="uCardIm">'
					 +'<div class="imcol">'
					 +'<div class="imC1"><div class="colLabel">姓名</div><div class="colText">'+name+'</div></div>'
					 +'<div class="imC1"><div class="colLabel">星级</div><div class="colText">'+level+'</div></div></div>'
					 +'<div class="imcol">'
					 +'<div class="imC1"><div class="colLabel">性别</div><div class="colText">'+male+'</div></div>'
					 +'<div class="imC1"><div class="colLabel">地址</div><div class="colText">'+adress+'</div></div></div></div>'
			}
			div +='</div>'
			$("#"+self.option.obj).empty().append(div)
			var height = $("#"+self.option.obj+' .imcol').height()
			$("#"+self.option.obj+' .imcol').css({
				"line-height":height+"px"
			})
		}
	}
	userCard.prototype.constructor = userCard
	return userCard
})