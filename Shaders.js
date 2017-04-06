var shaderProgram = [];
var vertexPositionAttribute = [];
var vertexColorAttribute = [];

	//Initialize shaders

function initShaders(gl) {
	var fragmentShader = getShader(gl, 'shader-fs');
	var vertexShader = getShader(gl, 'shader-vs');

		// Create the shader program

	shaderProgram[wgl.indexOf(gl)] = gl.createProgram();
	gl.attachShader(shaderProgram[wgl.indexOf(gl)], vertexShader);
	gl.attachShader(shaderProgram[wgl.indexOf(gl)], fragmentShader);
	gl.linkProgram(shaderProgram[wgl.indexOf(gl)]);

		// If creating the shader program failed, alert

	if (!gl.getProgramParameter(shaderProgram[wgl.indexOf(gl)], gl.LINK_STATUS)) {
		console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram[wgl.indexOf(gl)]));
	}

	gl.useProgram(shaderProgram[wgl.indexOf(gl)]);

	vertexPositionAttribute[wgl.indexOf(gl)] = gl.getAttribLocation(shaderProgram[wgl.indexOf(gl)], 'aVertexPosition');
	gl.enableVertexAttribArray(vertexPositionAttribute[wgl.indexOf(gl)]);

	vertexColorAttribute[wgl.indexOf(gl)] = gl.getAttribLocation(shaderProgram[wgl.indexOf(gl)], 'aVertexColor');
	gl.enableVertexAttribArray(vertexColorAttribute[wgl.indexOf(gl)]);
}

	//Load the shader program

function getShader(gl, id, type) {
	var shaderScript = document.getElementById(id);

		//Abort if shader program not found

	if (!shaderScript) {
		return null;
	}

	var theSource = shaderScript.text;

	if (!type) {
		if (shaderScript.type == 'x-shader/x-fragment') {
			type = gl.FRAGMENT_SHADER;
		} else if (shaderScript.type == 'x-shader/x-vertex') {
			type = gl.VERTEX_SHADER;
		} else {
			// Unknown shader type
			return null;
		}
	}
	var shader = gl.createShader(type);
	gl.shaderSource(shader, theSource);

		// Compile the shader program
	gl.compileShader(shader);  

		// See if it compiled successfully
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
		console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));  
		gl.deleteShader(shader);
		return null;  
	}

	return shader;
}