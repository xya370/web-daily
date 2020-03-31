'usr strict';
(function(root,factory){
    if(typeof define =='function' && define.amd){
        define(['jquery'],factory);
    }else if(typeof exports =='object'){
        module.exports = factory($);
    }else{
        root.imgLazy = factory($||window.jQuery)
    }
})(this,function($){
  function imgLazy() {
    this.target = $('#'+arguments[0])[0] || document;
    var parent = $('#'+arguments[0])[0] || $('body')[0];
    this.imgs = this.fifterImg($(this.target).find('img'),parent);
    this.imgWidth = $(this.imgs[0]).width();
    this.imgHeight = $(this.imgs[0]).height();
    var initIndex = 0;
    this.loadImg(this.imgs, initIndex);
  }
  imgLazy.prototype = {
    scroll: function() {
      var _this = this;
      this.target.addEventListener('scroll',function(e){
        var target = _this.target === document ? e.target.body : e.target;
        // _this.imgs.forEach(function(item, index){
        //   var rect = item.getBoundingClientRect()
        //   console.log(rect, index)
        // })
        // var top = _this.target === document ? document.scrollingElement.scrollTop : target.scrollTop,
        //     // height = _this.target == document ? window.screen.availHeight : target.clientHeight
        //     height = _this.imgHeight
        //     left = _this.target === document ? document.scrollingElement.scrollLeft : target.scrollLeft, 
        //     width = _this.imgWidth;
        // console.log(top)
        // var yn = parseInt((top+height)/height);
        // var xn = parseInt((left+width)/width);
        // var num = Math.max(yn,xn);
        // num = num > _this.imgs.length ? _this.imgs.length : num;
        // var yindex = top+height > height*num && ( num != _this.imgs.length )? num : num-1;
        // var xindex = left+width > width*num && ( num != _this.imgs.length )? num : num-1;
        // var index = Math.max(yindex, xindex);
        // if( top+height >= height*num ||  left+width > width*num) {
        //   _this.loadImg(_this.imgs, index)
        // }
      })
    },
    loadImg: function(imgs, index) {
      var imgSrc = $(imgs[index]).attr('imgs'),defaultImg = $(imgs[index]).attr('src');
      if(imgSrc && (imgSrc != defaultImg)) {
        $(imgs[index]).attr('src', imgSrc)
      }
    },
    fifterImg: function(arr, parent) {
      var nimgs = [];
      for(var img of arr) {
        if(img.parentNode === parent) {
          nimgs.push(img)
        }
      }
      return nimgs
    },
    // inSign: function(elm, target) {
    //   var _this = this;
    //   var height = $(target)[0].height,offsetTop = $(elm)[0].offsetTop,scrollTop = $(target)[0].scrollTop;
    //   console.log((offsetTop-scrollTop) < height)
    // }
  }
  imgLazy.prototype.constructor = imgLazy;
  return imgLazy;
})