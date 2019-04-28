// UMD:通用模块加载机制
(function(root,factory){
  if(typeof define==='function' && define.amd){
    define(['jquery'],factory);
  }else if(typeof exports=== 'object'){
    module.exports = factory($);
  }else{
    root.easy = factory(window.Zepto || window.jQuery || $)
  }
})(window,function($){
  var easy = function(){};
  easy.prototype={
    easydv:'<div class="easy-box"><div class="easy-body"><i class="easy-text"></i></spam><div class="easy-item"></div></div></div>',
    start:function(){
      var _this = this
      $('body').append(this.easydv)
      _this.loop()
    },
    // 进度条加载
    loop:function(){
      var _this = this;
      var step = _this.step || 1,count =1;
      var lop =function (){ 
        var wid = ++count * step;
        $('.easy-item').animate({ width: wid+'%' },200)
        $('.easy-text').text(_this.text||wid+'%')
        if(wid == 100){clearInterval(_this.intal);}
      };
      _this.intal=setInterval(lop,++count*200)  
    },
    init:function(setting){
      var _this = this;
      _this.step =  setting.step ||'';_this.text = setting.text || '';
      if(!!setting.style)$('.easy-item').attr('style',setting.style)
    },
    stop:function(){
      var _this=this;clearInterval(_this.intal)
    },
    restart:function(){
      var _this = this;clearInterval(_this.intal);$('.easy-box').remove();_this.start()
    }
  }
  return easy
})