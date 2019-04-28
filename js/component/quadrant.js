define(['ec','jquery','require'],function(ec,$,require){
    function quadrant(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    quadrant.prototype={
        init:function(option){
            var self = this;
            self.keys = Object.keys(self.option.data[0])
            self.keys = self.keys.slice(self.keys.indexOf('name')+1,self.keys.length)
            var color = self.option.color||['#3e99f7','#fffe54','#f8cd76','#ed73f8']
            $('#'+self.option.obj).empty().append('<div class="quadrantBox wid Box" id="'+self.option.obj+'_quadrant"></div>')
            var opt={
                tooltip:{
                    tigger:"axis",
                    show:self.option.tooltip||'show',
                    formatter:function(params){
                        var name = params.name,div='<div><div class="paramName">'+params.name+'</div>'
                        for(var item of self.option.data ){
                            if(item.name==name){
                                for(var ite of self.keys){
                                    div+='<div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+params.color+';"></span>'+ite+' : '+item[ite]+'</div>'
                                }
                                break
                            }
                        }
                        div+='</div>'
                        return div
                    }
                },
                grid:{
                    containLabel:true,
                    left:"5%",
                    right:"10%",
                    top:'10%',
                    bottom:"10%"
                },
                xAxis:{
                    type:'value',
                    splitLine:{show:false},
                    axisTick:{show:false},
                    axisLabel:{show:false},
                    axisLine:{
                        symbol:['none', 'arrow'],
                        symbolSize:[10,12],
                        lineStyle:{
                            color:"#d9d9d9" 
                        }
                    }
                },
                color:color,
                yAxis:{
                    type:'value',
                    splitLine:{show:false},
                    axisTick:{show:false},
                    axisLabel:{show:false},
                    axisLine:{
                        symbol:['none', 'arrow'],
                        symbolSize:[10,12],
                        lineStyle:{
                            color:"#d9d9d9" 
                        }
                    }
                },
                series:self.setSeries()
            }
            var charts = ec.init(document.getElementById(self.option.obj+'_quadrant'));
            charts.setOption(opt);
            if(!!self.option.seriesName){
                var div='',dor=['top-left','top-right','bottom-left','bottom-right']
                self.option.seriesName.forEach(function(item,index){
                    div+='<div class="sername se-'+dor[index]+'">'+item+'</div>'
                })
                $('#'+self.option.obj+'_quadrant').append(div)
                $('#'+self.option.obj+'_quadrant').on('click','.sername',function(e){
                    e.stopPropagation()
                    if(!!self.option.clickback&&typeof self.option.clickback=='function'){self.option.clickback()}
                })           
            }
          
        },
        setSeries:function(){
            var self = this,splitP1=self.option.splitPoint[0]||0
            var nData=[],series=[],d1=[],d2=[],d3=[],d4=[]
            for(var item of self.option.data){
                var x1 = item[self.keys[0]],y1=item[self.keys[1]]
                var idat={
                    name:item.name,
                    value:[x1-splitP1,y1-(self.option.splitPoint[1]||splitP1)],
                }
                if(idat.value[0]<=0 && idat.value[1]>0){d1.push(idat)}
                if(idat.value[0]>0 && idat.value[1]>=0){d2.push(idat)}
                if(idat.value[0]<=0 && idat.value[1]<=0){d3.push(idat)}
                if(idat.value[0]>0 && idat.value[1]<=0){d4.push(idat)}
            }
            nData.push(d1),nData.push(d2),nData.push(d3),nData.push(d4);
            nData.forEach(function(item,index){
                series.push({
                    name:"series_"+index,
                    type:"scatter",
                    data:item,
                    label:{
                        show:true,
                        formatter:'{b}',
                        color:"#7b8391",
                        position:[20,-10],
                    }   
                })
            })
            return series
        }
    }
    quadrant.prototype.constructor = quadrant
    return quadrant
})