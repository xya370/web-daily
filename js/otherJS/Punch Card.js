(function(root,factory){
  if(typeof define === 'function' && define.amd){
    define(['jquery','echarts'],factory)
  }else if(typeof exports === 'object'){
    module.exports = factory(require('$'),require('echarts'))
  }else{
    root.Puch= factory(window.jQuery || $,window.echarts)
  }
})(window,function($,echarts){
  var Puch = function(){};
  Puch.prototype ={
    puchs:'<div class="puchsBox clear"><div class="pushItem clear" id="pushItem"></div></div>',
    init:function(setting){
      var _this = this,setting =setting||{}; _this.target =setting.target || 'html'; _this.data = setting.data || '';
      !setting.target?$('body').empty().append(_this.puchs):$(_this.target).empty().append(_this.puchs)
      _this.setEcharts(setting)
    },
    setEcharts:function(setting){
      var _this = this,data = setting.data.datas ||'',series=[]
      data.forEach(function(item,index){
        series.push({
         type: 'scatter',
         data:item
        })
      })
      var opt={
        title:setting.title||'',
        xAxis:{
          type:'category',
          data:setting.data.xAxis||'',
          boundarGap:false,
          splitLine:{
            show:true
          }
        },
        yAxis:{
          type:'category',
          data:setting.data.yAxis||'',
          splitLine:{
            show:true
          }
        },
        series:series,
      }
      var ec = echarts.init(document.getElementById('pushItem'))
      ec.setOption(opt)
    },
  }
  return Puch
})