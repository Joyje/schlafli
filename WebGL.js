	//Empty lists for multiple WebGL elements
var wgl = [];
var nIntervId = [];

	//This function is called when the user hits enter in the input field.

var start = function(n){
		//Stop drawing previous shape.
	clearInterval(nIntervId[n]);
	wgl[n] = null;
		//Base settings for webGL canvas.
	wgl[n] = canimation[n].getContext("experimental-webgl");
	wgl[n].clearColor(0.0, 0.0, 0.0, 1.0);
	wgl[n].clearDepth(1.0);
	wgl[n].enable(wgl[n].DEPTH_TEST);
	wgl[n].depthFunc(wgl[n].LEQUAL);

		//Load shaders.
	initShaders(wgl[n]);

		//Load buffer.
	initBuffer(wgl[n]);

		//Start drawing shape.
	nIntervId[n] = setInterval(function(){ drawScene(wgl[n], canimation[n].width, canimation[n].height) }, 15);
}



//Rotation variables
var matrixRotation = 0.0;
var lastshapeUpdateTime = 0;

function drawScene(gl, width, height) {
		//Render the scene
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	perspectiveMatrix = makePerspective(45, width/height, 0.1, 100.0);

	loadIdentity();
	mvTranslate([-0.0, 0.0, -6.0]);
	mvPushMatrix();
	mvRotate(matrixRotation, [1, 0, 0]);


	for (var s = 0; s<Ptaus[wgl.indexOf(gl)]; s++) {
			//The shape
		gl.bindBuffer(gl.ARRAY_BUFFER, shapeVerticesBuffer[wgl.indexOf(gl)][s]);
		gl.vertexAttribPointer(vertexPositionAttribute[wgl.indexOf(gl)], 3, gl.FLOAT, false, 0, 0);
			//The color
		gl.bindBuffer(gl.ARRAY_BUFFER, shapeVerticesColorBuffer[wgl.indexOf(gl)]);
		gl.vertexAttribPointer(vertexColorAttribute[wgl.indexOf(gl)], 4, gl.FLOAT, false, 0, 0);

		setMatrixUniforms(gl);
		gl.drawArrays(gl.LINE_LOOP, 0, iterations[wgl.indexOf(gl)]/Ptaus[wgl.indexOf(gl)]);
	}


	mvPopMatrix();

	var currentTime = (new Date).getTime();
	if (lastshapeUpdateTime) {
		var delta = currentTime - lastshapeUpdateTime;
		matrixRotation += (30*delta) / 1000.0;
	}
	lastshapeUpdateTime = currentTime;
}

