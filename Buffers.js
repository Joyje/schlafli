var iterations = [];
var shapeVerticesBuffer = [];
var shapeVerticesColorBuffer = [];
var cubeVerticesBuffer;
var cubeVerticesIndexBuffer;
var cubeVerticesColorBuffer;
var initBuffer = function(gl){

	iterations[wgl.indexOf(gl)] = 0;
	pqr = document.getElementById('CAinput'+wgl.indexOf(gl)).value
	pqr = pqr.split(/{|}/);
	console.log(pqr);
	if (pqr == "") {
			cubeVerticesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);

			var vertices = [
				// Front face
				-1.0,  1.0,  1.0,	//0
				 1.0,  1.0,  1.0,	//1
				-1.0, -1.0,  1.0,	//2
				 1.0, -1.0,  1.0,	//3

				// Back face
				-1.0,  1.0, -1.0,	//4
				 1.0,  1.0, -1.0,	//5
				-1.0, -1.0, -1.0,	//6
				 1.0, -1.0, -1.0,	//7
			];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

			var colors = [
				[1.0,  1.0,  1.0,  1.0],    // Front face: white
				[1.0,  0.0,  1.0,  1.0],    // Left face: purple
				[0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
				[0.0,  1.0,  1.0,  1.0],    // Right face: turquoise
				[0.0,  1.0,  0.0,  1.0],    // Top face: green
				[1.0,  1.0,  0.0,  1.0],    // Right face: yellow
				[1.0,  0.0,  0.0,  1.0],    // Back face: red
				[0.0,  0.0,  0.0,  1.0]     // Right face: black
			];
			var generatedColors = [];

			for (var j = 0; j < 6; j++) {
				var c = colors[j];
				for (var i = 0; i < 4; i++){
					generatedColors = generatedColors.concat(c);
				}
			}
			cubeVerticesColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);


			cubeVerticesIndexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
			var cubeVertexIndices = [
				0,  1,  2,      1,  2,  3,    // front
				4,  5,  6,      5,  6,  7,    // back
				0,  1,  4,      1,  4,  5,    // top
				2,  3,  6,      3,  6,  7,    // bottom
				1,  3,  5,      3,  5,  7,    // right
				0,  2,  4,      2,  4,  6     // left
			]

			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
	}
	if (pqr.length>1 && pqr[1] != ""){
		if (pqr[0] == "" || pqr[0] < 1){
			pqr[0] = 1;
		}
		qr = pqr[1].split(/(?:,| )+/);
		shlafli(gl, pqr[0], qr[0]);
	} else {
		shlafli(gl, 1, pqr[0]);
	}
}
