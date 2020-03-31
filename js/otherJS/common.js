var reg1 = /(?<=\()[^()]*(?=\))/g ; //获取括号内的内容

// 数字千分位分割
function replaceNumber(val) {
  var rex = /(?=(?!\b)(\d{3})+$)/g
  return val = String(val).replace(rex, ',')
}
var randomStr = Math.random().toString(36).substr(2) // 随机字符生成

function isRgb(color) {
  return /^rgb/.test(color)
}
function isHex(color) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
}
function isHsl(color) {
  return /^hsl/.test(color);
}
function hextoRgb(color) {
  if(toString.call(color) === "[object String]") {
    var start = color.indexOf('#');
    color = color.slice(start+1);
    var rgb = "";
    for(var i = 0; i < color.length; i += 2 ) {
      var end = i+2
      rgb += parseInt(color.slice(i, end), 16).toString()+",";
    }
    rgb = rgb.slice(0, rgb.length-1)
    rgb = "rgb("+rgb+")"
    return rgb;
  }
}
function hslToRgb(color) {
  var arr = getMid(color).split(',');
  var r, g, b;
  var h = toNum((arr[0] / 360)+'' ), s = toNum(arr[1]), l = toNum(arr[2]); // h(色相) s(饱和度) l(亮度)
  var temp2, temp1;
  if (s == 0) {
    r = g = b = l;
  } else {
    temp2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    temp1 = 2 * l - temp2;

    var h2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p
    }
    r = h2rgb(temp1, temp2, h + 1/3);
    g = h2rgb(temp1, temp2, h);
    b = h2rgb(temp1, temp2, h - 1/3);
  }
  return  "rgb(" + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255)+')';
}
function getMid(str) {
  var left = str.indexOf('(')+1;
  var right = str.indexOf(')');
  return str.slice(left, right);
}
function toNum(str) {
  var rex = /[0-9]+/g;
  if(str.indexOf('%') > 0) {
      return (str.match(rex)[0]) / 100;
  } else {
    if(typeof(+str) === "number") {
      return +str;
    }
  }
}

/* 图片上传预览一 */

function PreviewImg(file, fn) {
  var image = new Image();
  var ready = new FileReader();
  ready.onload = function(){
    image.src = this.result;
    image.onload = function(){
     if(toString.call(fn) == "[object Function]"){
       fn(image)
     }
    }
  }
  ready.readAsDataURL(file)
}

/* 图片上传预览二 */
function PreviewImg2(file, fn){
  var url = '';
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  if(toString.call(fn) == "[object Function]") {
    fn(url);
  }
}

function quickSort(arr, key) {
  if(arr.length < 1) return arr;
  var left = right = [];
  var medianIndex = Math.floor(arr.length / 2);
  var median = arr.splice(medianIndex, 1)[0];
  var medianTarget = key ? median[key] : median;
  for(var i = 0; i < arr.length; i++) {
    var target = key ? arr[i][key] : arr[i];
    if (target <= medianTarget) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([median], quickSort(right));
}

var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

// Functions for escaping and unescaping strings to/from HTML interpolation.
var createEscaper = function(map) {
  var escaper = function(match) {
    return map[match];
  };
  // Regexes for identifying a key that needs to be escaped
  var source = '(?:' + _.keys(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function(string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
};
var escape = createEscaper(escapeMap);

/*节流函数*/
var now = Date.now;
/**
 * [options]
 * [leading] : false 禁用第一次首次执行
 * [trailing] : false 禁用最后一次执行
 * */
function trottle(fn, wait, options) {
  var initTime = 0;
  if(!options) {options = {}};
  var args;
  var laters = function(){
    initTime = now();
    args = arguments;
    timeOut = null;
    fnc.apply(null,args);
  }
  return function(){
    var nowTime = now();
    if(!initTime && options.leading === false){
      initTime = nowTime;
    }
    var remaining = wait - (nowTime - initTime);
    if (remaining < 0) {
      if (timeOut) {
       clearningTimeOut(timeOut);
       timeOut = null;
      }
      initTime = nowTime;
      fn.apply(null, args);
    } else if(!timeOut && options.trailing !== false){
      timeOut = setTimeOut(later, wait);
    }
  }
}

function randomColor() {
  var r = parseInt(Math.random() * 255);
  var g = parseInt(Math.random() * 255);
  var b = parseInt(Math.random() * 255);
  return "rgb("+r+","+g+","+b+")"
}
function randomColor2() {
  return Math.random().toString(16).substr(2,6);
}
