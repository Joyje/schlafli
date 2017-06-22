	//Appending canvases to website and put them in a list.
ChildAppender("canvas", "GLcontent", 'center', 'center', 1, 0.8);
var canimation = document.getElementsByClassName("CAcanvas");
	//Appending form to input shläfli symbol
ChildAppender("form", "GLcontent");
ChildAppender("input", "CAform", 'top', 'left');

	//List with all newly created canvases to iterate through.
for (var i = 0; i<canimation.length; i++){
	document.getElementById("CAform"+i).action = "javascript:start("+i+")";
}

	//Shläfli math and variables
var pqr;
var Pedges;
var Ptaus = [];
var schlf = {p: 0, q: 1, r: 0};

var shlafli = function(gl, a, p, q) {
	shapeVerticesBuffer[wgl.indexOf(gl)] = [];
	Ptaus[wgl.indexOf(gl)] = a;
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
