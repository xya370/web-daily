define(['ec','jquery','require'],function(ec,$,require){
    function map(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    map.prototype={
        init:function(option){
            var self=this;
            var callback = typeof self.option.callback !='undefined' && self.option.callback!==''? self.option.callback:''
            self.time = typeof self.option.data.time !=='undefined' && self.option.data.time !=='' ? self.option.data.time: '2017/02/09';
            self.radius = !!self.option.data.radius ? self.option.data.radius:500;
            $('#'+self.option.obj).empty();
            var div='';
            div+='<div class="mapBox">'
                +'<div class="topInfo">'
                +'<div class="location">实时热力图<span>(半径'+(self.radius)+'米)</span></div>'
                +'<div class="timesPer"><div class="dizhitu iconfont icon-location"></div><span></span></div>'
                +'</div>'
                +'<div class="mapCon"><div id="map_'+self.option.obj+'" style="width:100%;height:100%"></div></div>'
            +'</div>'
            $('#'+self.option.obj).append(div)
            var mapa =self.setMap()
            if(callback){
                callback();
            }
            // 百度地图图块加载完毕事件
            mapa.addEventListener("tilesloaded",function(){
                 if(typeof self.option.loaded !='undefined' && self.option.loaded!==''){
                     self.option.loaded()
                 }
             }) 
        },
        setMap:function(){
            var self=this;
            var lng = typeof self.option.data.lng !='undefined' && self.option.data.lng!==''? self.option.data.lng:'';
            var lat = typeof self.option.data.lat !='undefined' && self.option.data.lat!==''? self.option.data.lat:'';
            var ablezoom = typeof self.option.ablezoom !='undefined' && self.option.ablezoom!==''? self.option.ablezoom:false;
            var points = typeof self.option.data.points !='undefined' && self.option.data.points!==''? self.option.data.points:false;
            var range = self.radius == 500 ? 16:15; 
            var hotRan =self.radius == 500 ? 50:30; 
             var mapa=new BMap.Map('map_'+self.option.obj,{enableMapClick:false});
             var point=new BMap.Point(lng,lat);
             var myGeo = new BMap.Geocoder();
                // 坐标转换城市名称
                myGeo.getLocation(point,function(result){
                    if(result){
                        var city = result.addressComponents.city
                        var adress =result.address
                        $("#"+self.option.obj+' .timesPer span').empty().append('当前位置: '+adress)
                    }
                })
             mapa.centerAndZoom(point,range);
             mapa.enableScrollWheelZoom(ablezoom);
             var top_left_navigation = new BMap.NavigationControl();
             var icon = new BMap.Icon("../img/pointIcon.png", new BMap.Size(25,43),{
                 anchor: new BMap.Size(12,40),
             })
             var marker = new BMap.Marker(point,{icon:icon});
             var circle = new BMap.Circle(point,self.radius,{strokeColor:"#a7b1a6", strokeWeight:2, strokeOpacity:0.8,fillColor:""})
             mapa.addOverlay(circle);
             mapa.addOverlay(marker);
             mapa.addControl(top_left_navigation); 
             heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":hotRan});
             mapa.addOverlay(heatmapOverlay);
             heatmapOverlay.setDataSet({data:points,max:100});
             return mapa
        }
    }
    map.prototype.constructor = map
    return map
})