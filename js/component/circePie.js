define(['ec','jquery','require'],function(ec,$,require) {
  function circlePie(option) {
    var _option = $.extend({
    	data:[]
    },option);
    var self=this
    self.option=_option
    self.init(_option)
  }
  circlePie.prototype = {
    // 初始化
    init: function(option) {
      var self = this,option = self.option;
      var div = '<div class="wid Box" id="circlePie_'+option.obj+'"></div>'
      $('#'+option.obj).empty().append(div);
      self.setOption(option.data);
    },
    // echars 设置
    setOption: function(data) {
      var self = this;
      var color = data.color ? data.color : ['#48fffc', '#fec883','#48bbff'];
      // 数据处理
      var ndata = data.data.map(function(item){
        return {value: item.value, name: item.type}
      })
      var opt = {
        color: color,
        series: [{
          type:"pie",
					radius:['45%','55%'],
					data:ndata,
					center:["50%","60%"],
					hoverAnimation: false,
          roseType: data.roseType || false,
					label:{
						normal:{
              show: data.labelShow || false,
							textStyle:{
								color:"#fff"
							},
							padding:[0,-35,25,-35],
							formatter:'{b}  {d}%'
						}
					},
					labelLine:{
						normal:{
              length: 40,
							length2:25,
						}
					},
        }]
      }
      var charts = ec.init(document.getElementById('circlePie_'+self.option.obj));
      charts.setOption(opt);
    }
  }
  circlePie.prototype.constructor = circlePie;
  return circlePie;
})