;(function(root,factory){
    if(typeof define==='function' &&define.amd){
        define(['jquery','ec','ecStat','require'],factory)
    }else if(typeof exports =='object'){
        module.exports=factory(require('$'),require('echarts'),require('ecStat'))
    }else{
        root.Custom = factory(window.jQuery || $,window.echarts||window.ec,window.ecStat)
    }
})(this,function($,ec,ecStat,require,){
    function Custom(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    Custom.prototype={
        init:function(option){
           var _this=this;
           $('#'+_this.option.obj).empty().append('<div class="customBox Box wid" id="customBx"></div>')
           // ecStat,echarts
           var bind = ecStat.histogram(_this.option.data)
           console.log(bind)
           var data=[]
           ec.util.each(_this.option.data,function(item,index){
                data.push({
                    value:item[0]
                })
           })
           var opt={
                xAxis: [{
                    type: 'value',
                }],
                yAxis: [{
                    type: 'value',
                }],
                series:[{
                    type:'custom',
                    data:data,
                    encode: {
                        x: [1, 2],
                        y: 0
                    },
                    renderItem:function(params,api){
                        var categoryIndex = api.value(0)
                        var startPoint = api.coord([api.value(1),categoryIndex])
                        var endPoint = api.coord([api.value(2),categoryIndex])
                        var height = api.size([0,1])[1]*0.6
                        var rectShap = ec.graphic.clipRectByRect({
                            x:startPoint[0],
                            y:startPoint[1]-height/2,
                            width:endPoint[0]-startPoint[0],
                            height:height
                        },{
                            x:params.coordSys.x,
                            y:params.coordSys.y,
                            width:params.coordSys.width,
                            height:params.coordSys.height,
                        })
                        return rectShap &&{
                            type:'rect',
                            shap:rectShap,
                            style:api.style()
                        }
                    },
                }]
           }
           var echarts = ec.init(document.getElementById('customBx'))
           echarts.setOption(opt)
        }
    }
    Custom.prototype.constructor = Custom
    return Custom
})