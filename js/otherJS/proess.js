'use strict';
(function(root,factory){
    if(typeof define =='function' && define.amd){
        define(['jquery'],factory);
    }else if(typeof exports =='object'){
        module.exports = factory($);
    }else{
        root.proess = factory($||window.jQuery)
    }
})(this,function($){
    function proess(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    proess.prototype={
        init:function(option){
            var self = this,div='<ul class="status-list">'+self.setUl(self.option.data)+'</ul>'
            $("#"+self.option.obj).empty().append('<div class="proessBox" id="proess-'+self.option.obj+'">'+div+'<div class="proess-more">展示更多</div></div>')
            $('#'+self.option.obj+' .proessBox .proess-more').off('click').on('click',function(e){
                e.stopPropagation()
                if(!!self.option.callback && typeof self.option.callback=='function'){
                    var data = self.option.callback();
                    $('#'+self.option.obj).find('ul').append(self.setUl(data))
                    $('#'+self.option.obj+' .proessBox .proess-more').hide()
                }
            })
        },
        setUl:function(data){
            var self = this,div=''
            for(var item of data){
                var li='<li>'
                if(!!item.selected){
                    li ='<li class="status-now">'
                }
                div+=li
                    +'<div class="status-content-before">'+item.label+'</div>'
                    +'<div class="status-time-before">'+item.time+'</div>'
                    +'<div class="status-line"></div>'
                    +'</li>'
            } 
            return div
        }
    }
    proess.prototype.constructor = proess;
    return proess;
})