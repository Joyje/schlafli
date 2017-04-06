	//Appending canvases to website and put them in a list.
ChildAppender("canvas", "GLcontent", 'center', 'center', 1, 0.8);
var canimation = document.getElementsByClassName("CAcanvas");
	//Empty lists for multiple WebGL elements
var wgl = [];
var nIntervId = [];



var start = function(n){
		//Stop drawing previous shape.
	clearInterval(nIntervId[n]);
	wgl[n] = null;
		//Base settings for webGL
	wgl[n] = canimation[n].getContext("experimental-webgl");
	wgl[n].clearColor(0.0, 0.0, 0.0, 1.0);
	wgl[n].clearDepth(1.0);
	wgl[n].enable(wgl[n].DEPTH_TEST);
	wgl[n].depthFunc(wgl[n].LEQUAL);

	initShaders(wgl[n]);

	initBuffer(wgl[n]);

		//Start drawing new shape.
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

	if (pqr != "") {
		for (var s = 0; s<Ptaus; s++) {
				//The shape
			gl.bindBuffer(gl.ARRAY_BUFFER, shapeVerticesBuffer[wgl.indexOf(gl)][s]);
			gl.vertexAttribPointer(vertexPositionAttribute[wgl.indexOf(gl)], 3, gl.FLOAT, false, 0, 0);
				//The color
			gl.bindBuffer(gl.ARRAY_BUFFER, shapeVerticesColorBuffer[wgl.indexOf(gl)]);
			gl.vertexAttribPointer(vertexColorAttribute[wgl.indexOf(gl)], 4, gl.FLOAT, false, 0, 0);

			setMatrixUniforms(gl);
			gl.drawArrays(gl.LINE_LOOP, 0, iterations[wgl.indexOf(gl)]/Ptaus);
		}
	} else {
			//The shape
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
		gl.vertexAttribPointer(vertexPositionAttribute[wgl.indexOf(gl)], 3, gl.FLOAT, false, 0, 0);
			//The color
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
		gl.vertexAttribPointer(vertexColorAttribute[wgl.indexOf(gl)], 4, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
		setMatrixUniforms(gl);
		//gl.drawArrays(gl.LINE_LOOP, 0, 24);
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSINGNED_SHORT, 0);
	}


	mvPopMatrix();

	var currentTime = (new Date).getTime();
	if (lastshapeUpdateTime) {
		var delta = currentTime - lastshapeUpdateTime;
		matrixRotation += (30*delta) / 1000.0;
	}
	lastshapeUpdateTime = currentTime;
}

