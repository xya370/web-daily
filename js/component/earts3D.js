define(["ec",'jquery','require','ecgl','bmap'],function(ec,$,require,ecgl,bmap){
    function echarts3D(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    echarts3D.prototype={
        init:function(option){
            var _this = this;$('#'+_this.option.obj).empty().append('<div class="wid Box" id="'+_this.option.obj+'_e3D"></div>')
            var opt = _this.setOption(ec)
            var echarts = ec.init(document.getElementById(_this.option.obj+'_e3D'))
            echarts.setOption(opt)
        },
        setMap:function(echarts){
            var _this = this,baseUrl = 'http://' + window.location.host + '/',opt={},series=[];
            $.ajax(baseUrl + 'js/lib/echarts/map/json/china.json').done(function(chinaData){
                echarts.registerMap('china', chinaData)
                series.push({
                    type: 'map3D',
                    name : 'chinaMap',
                    map : "china",
                })
                opt.series = series
            })
            return opt
        },
        setOption:function(echarts){
            var _this=this,opt=''
            if(_this.option.data.type=='map3D'){
                opt = _this.setMap(echarts)
            }else{
                var opt={
                    color:['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                    xAxis3D:{
                        type:"value",
                    },
                    yAxis3D:{
                        type:"value",
                    },
                    zAxis3D:{
                        type:'value'
                    },
                    grid3D: {
                        boxWidth: 100,
                        boxDepth: 100,//3维场景中的深度
                        boxHeight:100,
                        // 光照相关设置
                        light: {
                            main: {
                                intensity: 1.2
                            },
                            ambient: {
                                intensity: 0.3
                            }
                        }
                    },
                    series:[{
                        type:_this.option.data.type,
                        data:_this.option.data.data,
                    }]
                }
            }
            return opt
        }
    }
    echarts3D.prototype.constructor = echarts3D
    return echarts3D
})