ChildAppender("form", "GLcontent");
ChildAppender("input", "CAform", 'top', 'left');

	//List with all newly created canvases to iterate through.
for (var i = 0; i<canimation.length; i++){
	document.getElementById("CAform"+i).action = "javascript:start("+i+")";
}
