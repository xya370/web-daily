define(['ec','jquery','require'],function(ec,$,require) {
  function lineBar (option) {
    var _option = $.extend({
    	data:[]
    },option);
    var self=this
    self.option=_option
    self.init(_option)
  }
  lineBar.prototype = {
    init: function(option) {
      var self = this;
      var div = '<div class="wid Box" style="display:flex;flex-direction: column;"><div id="line_'+option.obj+'" style="flex:4;"></div><div id="bar_'+option.obj+'" style="flex: 6;"></div></div>'
      $('#'+option.obj).empty().append(div);
      self.setBar();
      self.setLine();
    },
    setBar: function() {
      var self = this;
      var opt = {
        xAxis: {
          data: ['c1','c2','c3','c4'],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          }
        },
        yAxis: {
          type:'value',
          show: false,
        },
        series: [
          {
            type:'bar',
            data: ['1234','1109','1942', '1830'],
            itemStyle: {
              color: new ec.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: '#3EEFFC'},
                      {offset: 0.5, color: '#22C0D1'},
                      {offset: 1, color: '#018BA0'}
                  ]
              )
            },
          },
        ]
      }
      var charts = ec.init(document.getElementById('bar_'+self.option.obj));
      charts.setOption(opt);
    },
    setLine: function() {
      var self = this;
      var opt = {
        xAxis: {
          data: ['c1','c2','c3','c4'],
          show: false,
          nameTextStyle: {
            normal: {
              color: '#fff', 
            }
          },
        },
        color: ['#3B90FE'],
        yAxis: {
          type:'value',
          show: false,
        },
        series: [
          {
            type:'line',
            data: ['1234','1109','1942', '1830'],
          },
        ]
      }
      var charts = ec.init(document.getElementById('line_'+self.option.obj));
      charts.setOption(opt);
    }
  }
  lineBar.prototype.constructor = lineBar;
  return lineBar;
})