function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("experimental-webgl");
  

  /**
   * A ( 0.5, 0.5)
   * B ( 0.0, 0.0)
   * C ( -0.5, 0.5)
   * D ( 0.0, 1.0)
   */

  var vertices = [
      -0.6, 0.9, 
      -0.9, 0.6, 
      -0.6, 0.6,
      -0.6, 0.2
  ];

  //created a linked-list for storing the vertices data in the GPU realm
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

//vertex shader
    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main () {
      gl_PointSize = 10.0;
      gl_Position = vec4(aPosition, 0.0, 1.0);
      //gl Position -> final destination for storing 
      // positional data for renderen vertex

    }
  `;
    //vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
  
    //fragment shader
    var fragmentShaderCode = `
      precision mediump float;
          void main () {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            //Blue = R:0, G:0, B:1, A:1
          }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);
  
  
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
  
          //Teach the GPU how to collect 
          //The positional values from ARRAY_BUFFER
          //for each vertex being processed
        var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);  


    gl.clearColor(1.0, 0.75, 0.79, 1.0);
  
    gl.clear(gl.COLOR_BUFFER_BIT);
 
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
        //POINT
        //LINES
        //LINE_LOOP
        //LINE_STRIP
        //TRIANGLES
        //TRIANGLES_STRIP
        //TRIANGLE_FAN
        }      
