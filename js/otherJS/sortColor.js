function sortColor(colors) {
  return colors.sort(function(a, b){
    return grayLevel(b) - grayLevel(a)
  })
}

function grayLevel (color) {
  color = isRgb(color) 
    ? color 
    : isHex(color) 
      ? hextoRgb(color)
      : hslToRgb(color);
  var arr = getMid(color).split(',')
  var r = arr[0], g = arr[1], b = arr[2];
  return r*0.299 + g*0.587 + b*0.114
}
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
function getMid(str) {
  var left = str.indexOf('(')+1;
  var right = str.indexOf(')');
  return str.slice(left, right);
}
// hsl(208, 36%, 39%)
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
console.log(hslToRgb('hsl(208, 0.36, 0.39)'))