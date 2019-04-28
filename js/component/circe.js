define(['ec','jquery','require'],function(ec,$,require){
    function circe(option){
        var _option = $.extend({
            data:[]
        },option);
        var self=this
        self.option=_option
        self.init(_option)
    }
    circe.prototype={
        init:function(option){
            var self = this,timeAr='<div class="wid Box timeAr">'
            var day = self.option.data.day||'--',unit=self.option.unit||'天'
            for(var i=8;i<21;i++){
                timeAr+='<div class="timeContent">'
                +'<span class="untime" id="circetm_'+i+'">'+i+':00</span>'
                +'<span class="circe uncire" id="circe_'+i+'"></span>'
                +'</div>'
            }
            timeAr+='</div>'
            var div='<div class="wid Box circeBox" id="'+self.option.obj+'_circe">'
                +'<div class="circeContent">'
                +'<div class="circeLeft"><div class="wid Box circeDay">'+day+unit+'</div></div>'
                +'<div class="circeRight">'+timeAr+'</div>'
                +'</div>'
                +'</div>'
            $('#'+self.option.obj).empty().append(div)
            self.option.data.hour.forEach(function(item,index){
                $('#'+self.option.obj+' #circetm_'+item).show()
                 $('#'+self.option.obj+' #circe_'+item).removeClass('uncire').addClass('selectCirce')
            })
        },
        setData1:function(){
           var self = this,cire='<div class="cireAr">',timeAr='<div class="wid Box timeAr">'
            var day = self.option.data.day||'--',unit=self.option.unit||'天'
            for(var i=8;i<21;i++){
                 cire+='<span class="circe uncire" id="circe_'+i+'"></span>'
                 var itx = i+':00~'+(i+1)+':00'
                 timeAr +='<span class="untime" id="circetm_'+i+'">'+itx+'</span>'
            }
            cire+='</div>'
            timeAr+='</div>'
            var top='<div class="circeTop"><div class="circeLeft"><div class="wid Box circeDay">'+day+unit+'</div></div><div class="circeRight">'+timeAr+'</div></div>'
            var bottom='<div class="circeBottom">'+cire+'</div>'
            $('#'+self.option.obj).empty().append('<div class="wid Box circeBox" id="'+self.option.obj+'_circe">'+top+bottom+'</div>')
            var timeAr=$('#'+self.option.obj+' .circeTop').find('span.untime')
            var width=$('#'+self.option.obj+' .circeBottom .cireAr').width()
            var iw = (width/timeAr.length).toFixed(2)
            $('.cireAr span').each(function(index,item){
                 $(item).css('left',(iw*index)+'px')
                 $(timeAr[index]).css('left',(iw*index)+'px')
            })
           $('.cireAr span').each(function(index,item){
                $(item).css('left',iw*index+'px')
                $(timeAr[index]).css('left',iw*index+'px')
           })
           self.option.data.hour.forEach(function(item,index){
                $('#'+self.option.obj+' #circetm_'+item).show()
                 $('#'+self.option.obj+' #circe_'+item).removeClass('uncire').addClass('selectCirce')
           })
        }
    }
    circe.prototype.constructor = circe
     return circe
})