'use strict';
(function(root,factory){
    if(typeof define =='function' && define.amd){
        define(['jquery'],factory);
    }else if(typeof exports =='object'){
        module.exports = factory($);
    }else{
        root.DatePicker = factory($||window.jQuery)
    }
})(this,function($){
    function DatePicker(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    DatePicker.prototype={
        init:function(option){
            var _this = this;
            var target = _this.option.elem||'body';
            _this.year = new Date(_this.option.setVal).getFullYear()||new Date().getFullYear();
            _this.month = new Date(_this.option.setVal).getMonth()|| new Date().getMonth();
            _this.date =  new Date(_this.option.setVal).getDate()||new Date().getDate();
            $(target).empty().append(_this.setBody());
            _this.setEvent()
            $(target).find('li[month='+this.month+']').trigger('click')
            $(target).find('li[year='+this.year+']').trigger('click')
        },
        setYears:function(){
            var _this = this;
            var minYear = _this.option.minYear||1970;
            var maxYear = _this.option.maxYear||2180;
            var ul='<ul class="dp-years dp-ul-list">'
            for(var i=minYear;i<=maxYear;i++){
                ul+='<li class="de-years-li dp-li" year='+i+'>'+i+'</li>'
            }
            ul+='</ul>'
            return ul
        },
        setMounth:function(){
            var _this = this;
            var mdate =['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            var ul='<ul class="dp-month dp-ul-list">'
            for(var i=0;i<mdate.length;i++){
                ul+='<li class="de-month-li dp-li" month='+i+'>'+mdate[i]+'</li>'
            }
            ul+='</ul>'
            return ul
        },
        setBody:function(){
            var _this = this;
            var div ='<div class="dpBox dpcirce">'
                    +'<div class="dpTop">'
                    +'<div class="dpnm dpTop-sp" id="dpnm"><span class="dpcirce"></span>'+_this.setMounth()+'</div>'
                    +'<div class="dpny dpTop-sp" id="dpny"><span class="dpcirce">'+_this.year+'</span>'+_this.setYears()+'</div></div>'
                    +'<div class="dpBody" id="dpBody">'+_this.setDay()+'</div>'
                    +'</div>'
            return div
        },
        setEvent:function(){
            var _this= this;
            $(_this.option.elem).off('click').on('click','li',function(e){
                e.stopPropagation
                var target = e.target
                $(target).parents('.dpTop-sp').find('span').text($(target).text())
                if($(target).attr('month')){_this.month = $(target).attr('month')}
                if($(target).attr('year')){_this.year = $(target).attr('year')}
                $(target).parents('ul').hide()
                $(_this.option.elem).find('#dpBody').empty().append(_this.setDay())
                $(_this.option.elem).find('.dp-day-span[month='+(+_this.month+1)+'][day='+_this.date+']').trigger('click')
                _this.setCss()
            }).on('click',' .dp-day-span',function(e){
                e.stopPropagation();
                $(_this.option.elem+' .dp-table').find('.dp-day-span.select-dp-day').removeClass('select-dp-day')
                $(e.target).addClass('select-dp-day')
            })
            document.onclick=function(e){
                e.stopPropagation();
                var target = e.target|| e.srcElement
                if(target == $(_this.option.elem+' #dpnm').find('span')[0]){
                   if($(_this.option.elem+' #dpnm').find('ul').is(":hidden")){
                        $(_this.option.elem+' #dpnm').find('ul').show()
                    }else{
                        $(_this.option.elem+' #dpnm').find('ul').hide();
                    }
                }else{
                     $(_this.option.elem+' #dpnm').find('ul').hide();
                }
                if(target == $(_this.option.elem+' #dpny').find('span')[0]){
                    if($(_this.option.elem+' #dpny').find('ul').is(":hidden")){
                        $(_this.option.elem+' #dpny').find('ul').show()
                    }else{
                        $(_this.option.elem+' #dpny').find('ul').hide();
                    }
                }else{
                    $(_this.option.elem+' #dpny').find('ul').hide()
                }
            }
        },
        setDay:function(){
            var _this = this;
            var wd=['日','一','二','三','四','五','六'],days = new Date(+_this.year,+_this.month+1,0).getDate()
            var firstDay = new Date(+_this.year,+_this.month,1).getDay(),lastDays = new Date(+_this.year,+_this.month,0).getDate()
            var tbody ='<div class="dp-table"><div class="dp-weed">',aldays=[];_this.pday=[]
            var lastwd = new Date(+_this.year,+_this.month,days).getDay();_this.pvedays=[]
            for(var i=1;i<=days;i++){aldays.push(i)}
            if(firstDay!==0){
                for(var n=0;n<firstDay;n++){
                    _this.pday.push(lastDays-n)
                }
            }
            if(lastwd!==0){
                for(var q =6-lastwd;q>0;q--){
                 _this.pvedays.push(q)
                }
            }            
            var ndays=_this.pday.reverse().concat(aldays,_this.pvedays.reverse())
            var nw = Math.ceil(ndays.length/7),idv=''
            for(var i=0;i<nw;i++){
                idv+='<div class="dp-day-line" style="width:100%;height:calc( 100% / '+nw+' )" week="'+(i+1)+'">'
                for(var j=0;j<ndays.length;j++){
                    if(parseInt(j/7)==i){
                        var month= +_this.month+1;
                        if(j<_this.pday.length){month=+_this.month}
                        if(j>_this.pday.length+days-1){month=+_this.month+1==12?1:+_this.month+2}
                        idv+='<div class="dp-day-span"  day="'+ndays[j]+'" month="'+month+'">'+ndays[j]+'</div>'   
                    }
                }
                idv+='</div>'
            }
            for(var iten in wd){
                tbody +='<div class="de-weed-sp">'+wd[iten]+'</div>'
            }
            tbody+='</div><div class="dp-day-table dpcirce" >'+idv+'</div></div>'
            return tbody
        },
        setCss:function(){
            var _this = this;
            var arr =$(_this.option.elem).find('.dp-day-span')
            _this.pday.forEach(function(item,index){
                $($(_this.option.elem).find('.dp-day-span').eq(index)).addClass('unNowday')
            })
            _this.pvedays.forEach(function(item,index){
                var num = (arr.length-1)-index
                $($(_this.option.elem).find('.dp-day-span').eq(num)).addClass('unNowday')
            })
        },
        // 设置范围时间；
        setRange:function(){
            var _this = this;
            var year = new Date(_this.option.min).getFullYear();
            var month = new Date(_this.option.min).getMonth();
            var date =  new Date(_this.option.min).getDate();
            if(_this.year!==year){
                $(_this.option.elem+' .dp-table .dp-day-table').off('click').addClass('unClick')
            }
            if(_this.year==year){
                if(_this.month!==month){
                    $(_this.option.elem+' .dp-table .dp-day-table').off('click').addClass('unClick')
                }
            }
        }   
    }
    DatePicker.prototype.constructor = DatePicker;
    return DatePicker;
})