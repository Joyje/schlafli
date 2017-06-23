var iterations = [];
var shapeVerticesBuffer = [];
var shapeVerticesColorBuffer = [];

var initBuffer = function(gl){

	iterations[wgl.indexOf(gl)] = 0;
	pqr = document.getElementById('CAinput'+wgl.indexOf(gl)).value
	pqr = pqr.split(/{|}/);
	console.log(pqr);

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
