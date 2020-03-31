(function(window){
  var mobileEvent = function (selectDom) {
    return mobileEvent.prototype.init(selectDom)
  }
  mobileEvent.prototype = {
    init: function(selectDom) {
      if (isString(selectDom)) {
        this.dom = window.document.querySelector(selectDom);
        return this;
      }
    },
    /**
     * @description [description] 移动端单击事件
     * @param       [Type]        [name] [<description>]
     * @param       [Type]        [name] [<description>]
     * @param       {Function}    fn     [description] 回调函数
     * @return      {[type]}             [description]
     */
    touch: function(fn) {
      this.dom.addEventListener("touchstart",touchFn);
      this.dom.addEventListener("touchend",touchFn);
      var startTime,endTime;
      function touchFn(e) {
       if (e.type == 'touchstart') {
        startTime = new Date().getTime()
       } else if (e.type == 'touchend') {
        endTime = new Date().getTime()
        if (endTime - startTime < 300) {
          if (isFunction(fn)) {
            fn.call(this, e)
          }
        }
       }
      }
    },
    /**
     * @description [description] 移动端长按事件
     * @param       [Type]        [name] [<description>]
     * @param       [Type]        [name] [<description>]
     * @param       {Function}    fn     [description] 回调触发
     * @param       {Number}      delay  [description] 设置的长按时间
     * @return      {[type]}             [description]
     */
    longTouch: function(fn, delay = 1000) {
      this.dom.addEventListener('touchstart',touchFn);
      this.dom.addEventListener('touchend',touchFn);
      this.dom.addEventListener('touchmove',touchFn);
      var timeId;
      function touchFn(e) {
        var eventType = e.type;
        if (eventType == 'touchstart') {
          timeId = setTimeout(() => {
            if (isFunction(fn)) {
              fn.call(this,e)
            }
          }, delay)
        } else if (eventType == "touchend" || eventType == "touchmove") {
          clearTimeout(timeId)
        }
      }
    },
    /**
     * @description [description] 左侧滑动事件
     * @param       [Type]        [name] [<description>]
     * @param       [Type]        [name] [<description>]
     * @param       {Function}    fn     [description]
     * @param       {Number}      long   [description] 滑动距离设置
     * @return      {[type]}             [description]
     */
    leftMove:function(fn, long = 50) {
      this.dom.addEventListener('touchstart',touchFn);
      this.dom.addEventListener('touchend',touchFn);
      var startX, startY, endX, endY;
      function touchFn(e) {
        e.preventDefault()
        var touchPoint = e.changedTouches[0]
        if (e.type == "touchstart") {
          startX = touchPoint.pageX;
          startY = touchPoint.pageY;
        } else if (e.type == "touchend"){
          endX = touchPoint.pageX;
          endY = touchPoint.pageY
          if (Math.abs(endX - startX) >= Math.abs(endY - startY) && (endX - startX) >= long) {
            if (isFunction(fn)) {
              fn.call(this,e)
            }
          }
        }
      }
    },
    /**
     * @description [description] 右侧滑动事件
     * @param       [Type]        [name] [<description>]
     * @param       [Type]        [name] [<description>]
     * @param       {Function}    fn     [description]
     * @param       {Number}      long   [description]  滑动距离设置
     * @return      {[type]}             [description]
     */
    rightMove: function(fn, long = 50) {
      this.dom.addEventListener('touchstart',touchFn);
      this.dom.addEventListener('touchend',touchFn);
      var startX, startY, endX, endY;
      function touchFn(e) {
        e.preventDefault()
        var touchPoint = e.changedTouches[0]
        if (e.type == "touchstart") {
          startX = touchPoint.pageX;
          startY = touchPoint.pageY;
        } else if (e.type == "touchend"){
          endX = touchPoint.pageX;
          endY = touchPoint.pageY;
          if (Math.abs(startX - endX) >= Math.abs(startY - endY) && (startX - endX) >= long) {
            if (isFunction(fn)) {
              fn.call(this,e)
            }
          }
        }
      }
    },
    topMove: function(fn, long = 50) {
      var _this = this;
      this.dom.addEventListener('touchstart',touchFn);
      this.dom.addEventListener('touchend',touchFn);
      this.dom.addEventListener('touchmove',touchFn);
      var startX, startY, endX, endY;
      function touchFn(e){
        e.preventDefault()
        var touchPoint = e.changedTouches[0]
        if (e.type == "touchstart") {
          startX = touchPoint.pageX;
          startY = touchPoint.pageY;
        } else if (e.type == "touchend"){
          endX = touchPoint.pageX;
          endY = touchPoint.pageY;
          _this.dom.style.cssText = "transform: translateY(0px); transition: transform .2s linear 0s;"
          if (Math.abs(endY - startY) >= Math.abs(endX - startX) && (endY - startY) >= long) {
            if (isFunction(fn)) {
              // location.reload();
              fn.call(this,e)
            }
          }
        } else if(e.type == "touchmove"){
          endX = touchPoint.pageX;
          endY = touchPoint.pageY;
          if (Math.abs(endY - startY) >= Math.abs(endX - startX) && (endY - startY) >= long) {
            _this.dom.style.cssText = "transform: translateY(40px); transition: transform .2s linear 0s;"
          }
          // console.log()
          // _this.dom.style.cssText = "transform: translateY(40px);"
          // 
        }
      }
    }
  }
  function isString(str){
    return toString.call(str) === "[object String]"
  }
  function isFunction (fn) {
    return toString.call(fn) === "[object Function]"
  }
  window.mobileEvent = mobileEvent;
})(window)