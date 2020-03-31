function getColor(img, cb) {
  var canvas = document.createElement('canvas');
  var cont = canvas.getContext('2d'),
    width = height = 0, imageData, length = 0, blockSize = 1,cubeArr = [];
    
  width = canvas.width = img.width;
  height = canvas.height = img.height;
  cont.drawImage(img, 0, 0, width, height); //将图片以canvas的方式绘制，
  imageData = cont.getImageData(0,0, width, height).data; //获取图片的颜色信息。
  
  /*
  *   imageData信息存储方式:
  *   red = imageData[0], 
  *   green = imageData[1],
  *   blue = imageData[2],
  *   alpha = imageData[3]
  *   每4组可以组成一个完整的rgba颜色值。
  */
  var total = imageData.length / 4;
  var rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0;
  for (var i = 0; i < total; i++) {
    var red = imageData[i*4],
      green = imageData[i*4 + 1],
      blue = imageData[i*4 +2];
    if (red < rMin) {
      rMin = red;
    }
    if (red > rMax) {
        rMax = red;
    }
    if (green < gMin) {
        gMin = green;
    }
    if (green > gMax) {
        gMax = green;
    }
    if (blue < bMin) {
        bMin = blue;
    }
    if (blue > bMax) {
        bMax = blue;
    }
  }
  // 获取颜色色值范围、
  var colorRange = [[rMin, rMax], [gMin, gMax], [gMin, gMax]];
  var colorBox = new ColorBox(colorRange, total, imageData);
  console.log(colorBox)
  var colorBoxArr = queCut([colorBox], 8)
  var colorArr = [];
  for (var j = 0; j < colorBoxArr.length; j++) {
    colorBoxArr[j].total && colorArr.push(colorBoxArr[j].getColor());
  }
  if(cb) {
    cb(colorArr);
  }
}

function ColorBox(colorRange, total, data) {
  this.colorRange = colorRange;
  this.total = total;
  this.data = data;
  // r*g*b
  this.volume = (colorRange[0][1] - colorRange[0][0]) * (colorRange[1][1] - colorRange[1][0]) * (colorRange[2][1] - colorRange[2][0])
  this.rank = this.total * this.volume;
}
ColorBox.prototype.getColor = function(){
  let total = this.total;
  let data = this.data;
  
  let rCount = 0,
    gCount = 0,
    bCount = 0;
 
  for (var i = 0; i < total; i++) {
    rCount += data[i * 4];
    gCount += data[i * 4 + 1];
    bCount += data[i * 4 + 2];
  }
  return [parseInt(rCount / total), parseInt(gCount / total), parseInt(bCount / total)];
}

function queCut(que, num) {
  while(que.length < num) {
    que.sort(function(a, b){
      return a.rank - b.rank
    })
    var colorBox = que.pop();
    var result = cutBox(colorBox);
    que = que.concat(result);
  }
  return que.slice(0, 8)
}

function cutBox(colorBox) {
  var colorRange = colorBox.colorRange;
  var cutSide = getCutSide(colorRange),
      colorCountMap = {},
      total = colorBox.total,
      data = colorBox.data;
  
  for (var i = 0; i < total ; i++) {
    var color = data[i *4 + cutSide];
    if(colorCountMap[color]) {
      colorCountMap[color] += 1
    } else {
      colorCountMap[color] = 1
    }
  }
  var medianColor = getMedianColor(colorCountMap, total);
  var cutValue = medianColor.color,
    cutCount = medianColor.count;
  var newRange = cutRange(colorRange, cutSide, cutValue);
  var box1 = new ColorBox(newRange[0], cutCount, data.slice(0,cutCount * 4));
  var box2 = new ColorBox(newRange[1],total - cutCount, data.slice(cutCount * 4));
  return [box1, box2]
}

//获取颜色中最长的那条边，以便切割。
function getCutSide(range) {
  var arr = [];
  for(var i = 0 ; i < 3; i++) {
    arr.push(range[i][1] - range[i][0])
  }
  return arr.indexOf(Math.max(arr[0], arr[1], arr[2]));
}

function getMedianColor(colorCountMap, total) {
  var arr = [];
  for (var key in colorCountMap) {
    arr.push({
      color: parseInt(key),
      count: colorCountMap[key]
    })
  }
  
  var sortArr = _quickSort(arr);
  var medianCount = 0,
  medianColor = 0,
  medianIndex = Math.floor(sortArr.length / 2)
  
  for(var i = 0; i <= medianIndex; i++) {
    medianCount += sortArr[i].count;
  }
  return {
    color: parseInt(sortArr[medianIndex].color),
    count: medianCount
  }
}

// 二分法快速排序
function _quickSort(arr) {
  if(arr.length < 1) {
    return arr;
  }
  
  var pivotIndex = Math.floor(arr.length / 2),
    pivot = arr.splice(pivotIndex, 1)[0];
   
  var left = [], right = [];
  for(var i = 0; i < arr.length; i++) {
    if(arr[i].count <= pivot.count) {
      left.push(arr);
    } else {
      right.push(arr);
    }
  }
  return _quickSort(left).concat([pivot],_quickSort(right));
}

function cutRange(range, side, value){
  var arr1 = [], arr2 = [];
  range.forEach(function(item){
    arr1.push(item.slice());
    arr2.push(item.slice());
  })
  arr1[side][1] = value;
  arr2[side][0] = value;
  return [arr1, arr2]
}