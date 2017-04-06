var pqr;
var Pedges;
var Ptaus;
var schlf = {p: 0, q: 1, r: 0};
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
		shape(gl, pqr[0], qr[0]);
	} else {
		shape(gl, 1, pqr[0]);
	}
}
		var shape = function(gl, a, p, q) {
			shapeVerticesBuffer[wgl.indexOf(gl)] = [];
			Ptaus = a;
			p = p.split('/');
			if (p.length > 1) {
				schlf.p = parseInt(p[0], 10)/parseInt(p[1], 10);
			} else {schlf.p = parseInt(p[0], 10)}
			var vertices = [];

			for (var L = 0; L<a; L++) {
				if (p[1]) {var check = (0.5*Math.PI)+(((L*(2*Math.PI/schlf.p))/a)/p[1]);
				} else {var check = (0.5*Math.PI)+((L*(2*Math.PI/schlf.p))/a);}

				vertices[L] = []

				for (var r = check; iterations[wgl.indexOf(gl)] < parseInt(p[0], 10)*(L+1); r += (2*Math.PI/schlf.p)) {
					var vec = [Math.cos(r), Math.sin(r), 0];
					vertices[L] = vertices[L].concat(vec);
					iterations[wgl.indexOf(gl)]++;
				}

				shapeVerticesBuffer[wgl.indexOf(gl)][L] = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, shapeVerticesBuffer[wgl.indexOf(gl)][L]);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices[L]), gl.STATIC_DRAW);
			}

				//color
			var colors = [];

			for (var c = 0; c < iterations[wgl.indexOf(gl)]; c++) {
				if (c == 1 || c % 8 == 0) {
					var palette = [1.0, 0.0, 1.0, 1.0];
				} if (c == 2 || c % 9 == 0) {
					var palette = [0.0, 0.0, 1.0, 1.0];
				} if (c == 3 || c % 10 == 0) {
					var palette = [0.0, 1.0, 1.0, 1.0];
				} if (c == 4 || c % 11 == 0) {
					var palette = [0.0, 1.0, 0.0, 1.0];
				} if (c == 5 || c % 12 == 0) {
					var palette = [1.0, 1.0, 0.0, 1.0];
				} if (c == 6 || c % 13 == 0) {
					var palette = [1.0, 0.0, 0.0, 1.0];
				} if (c == 0 || c % 7 == 0) {
					var palette = [1.0, 1.0, 1.0, 1.0];
				}
				colors = colors.concat(palette);
			}

			shapeVerticesColorBuffer[wgl.indexOf(gl)] = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, shapeVerticesColorBuffer[wgl.indexOf(gl)]);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		}
