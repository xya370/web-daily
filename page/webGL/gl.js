function gl(Id) {
  var canvas = document.getElementById(Id);
  var gl = canvas.getContext("experimental-webgl");
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT);
  // var program = initSource(gl, vShader, fShader);
  return gl;
}

function initSource(gl, vShader, fShader) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  //引入着色器
  gl.shaderSource(vertexShader, vShader);
  gl.shaderSource(fragmentShader, fShader)
  //编译
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  //创建程序对象
  var program = gl.createProgram();
  //附着着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // //链接程序
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}

function initVertexBuffers(gl,program, data, n) {
  var vertices = new Float32Array(data);
  // var n = 3 // 需要绘制的点的个数n

  // 创建一个缓冲区
  var vertexBuffer = gl.createBuffer();

  //缓冲区对象绑定到目标上
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  //将数据写入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  //获取a_Position变量存储位置
  var a_Position = gl.getAttribLocation(program, "a_Position");

  //将缓冲区对象赋值给a_Position变量
  gl.vertexAttribPointer(a_Position, n, gl.FLOAT, false, 0,0);

  //链接a_Position变量和缓冲区对象
  gl.enableVertexAttribArray(a_Position);
  return n ;
}
function  initMatrix (gl, progam, matrix) {
  var uXFormMatrix = new Float32Array(matrix);
  var u_xformMatrix = gl.getUniformLocation(progam, "u_xfromMatrix");
  gl.uniformMatrix4fv(u_xformMatrix, false, uXFormMatrix);
}
