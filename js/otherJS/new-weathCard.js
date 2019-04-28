(function(root,factory){
  if( typeof define === 'function' && define.amd){
    define(['jquery'],factory)
  }else if(typeof exports ==='object'){
    module.exports = factory(require('$'))
  }else {
    root.WeathCard = factory(window.jquery||$)
  }
})(window,function($){
  class WeathCard {
    init(setting){
      let _this=this
      let deSetting = {
          key:setting.key||"80115a686f8c4c8c9aeff60d61ae9f14",
          point:setting.point||'杭州',
          target:setting.target||'body',
          ak:setting.ak||'',
          baidu:setting.baidu　|| false,
          callback:(data)=>{_this._setDom(data)}
        }
      _this.setting = deSetting
      _this.target = deSetting.target
      _this.start()
    }
    start(){
      let _this = this
      let url = !!_this.setting.baidu && _this.setting.baidu ==true ? "https://api.map.baidu.com/telematics/v3/weather?output=json" :"https://free-api.heweather.com/s6/weather/now?"
      let type =!!_this.setting.baidu && _this.setting.baidu ==true?'jsonp':'json'
      $.ajax({
        type:'post',
        url:url,
        data:{
          location:_this.setting.point,
          key:_this.setting.key,
          ak:_this.setting.ak
        },
        dataType: type,
      }).done(function(data){
        if(!!data)_this.setting.callback &&_this.setting.callback(data, _this.setting);
      }).fail(function(data){})
    }
    _setDom(data){
      let _this = this,location,weathText,windText,condCode,time,tmp,fl,pageurl,bottom=''
      if(!!data.HeWeather6){
       var weathData = data.HeWeather6[0]||'',basic=weathData.basic||'',now = weathData.now||'';
        location = basic.location || '',weathText = now.cond_txt ||'',windText = now.wind_dir||'',condCode = now.cond_code,
        time = weathData.update.loc,tmp = now.tmp||'',fl=now.fl||'',pageurl ='../../baidu/img/weath/'+condCode+'.png'
      }else{
        var  baiduWeath = data.results[0],dateWeath = baiduWeath.weather_data[0];
        time = data.date,location = baiduWeath.currentCity || '',windText = dateWeath.wind ||'',pageurl = dateWeath.dayPictureUrl;
        tmp = dateWeath.date.substring(dateWeath.date.indexOf("：")+1,dateWeath.date.indexOf('℃'))
        bottom = '<div class="weath-bottom-other">'
                  +'<div class="weath-pm">当前pm2.5指数：'+baiduWeath.pm25+'</div>'
                  +'</div>'
      }
     let dom ='<div class="weathBox infire">'
              +'<div class="weath-top">'
              +'<div class="weath-top-left weathpart">'
              +'<div class="weath-top-tmp topPart">'+tmp+'℃</div>'
              +'<div class="weath-top-adress">'+location+'</div>'
              +'<div class="weath-top-wind">'+windText+'</div>'
              +'</div>'
              +'<div class="weath-top-right weathpart">'
              +'<img src="'+pageurl+'" alt="" class="weath-img"/>'
              +'</div>'
              +'</div>'
              +'<div class="weath-bottom" style="display:none">'
              +bottom 
              +'</div>'
              +'</div>'
      $(_this.target).append(dom)
    }
  }
  return WeathCard
})