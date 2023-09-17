function ChildAppender (childElement, containerClass, childWidth, childHeight, childXPos, childYPos) {
		//Placing the containers new children in the right places.
	var containers = document.getElementsByClassName(containerClass);
	for (var i = 0; i < containers.length; i++) {
		var containerChild = document.createElement(childElement);
		containerChild.className = "CA"+childElement;
		containerChild.id = containerChild.className+i;


		if (childWidth) {
			containerChild.width = containers[i].offsetWidth*childWidth;
		} else {containerChild.width = containers[i].offsetWidth;}

		if (childHeight) {
			containerChild.height = containers[i].offsetHeight*childHeight;
		} else {containerChild.height = containers[i].offsetHeight;}

		if (childYPos == 'bottom') {
			containerChild.style.top = (containers[i].offsetHeight)-(containerChild.height)+"px";
		} else if (childYPos == 'top'){
			containerChild.style.top = "0px";
		}else {
			containerChild.style.top = (containers[i].offsetHeight/2)-(containerChild.height/2)+"px";
		}

		if (childXPos == 'right') {
			containerChild.style.left = (containers[i].offsetWidth)-(containerChild.width)+"px";
		} else if (childXPos == 'left'){
			containerChild.style.left = "0px";
		}else {
			containerChild.style.left = (containers[i].offsetWidth/2)-(containerChild.width/2)+"px";
		}

		if (containers[i].style.zIndex) {
			containerChild.style.zIndex = parseInt(containers[i].style.zIndex, 10) + 1;
		} else {
			containerChild.style.zIndex = 30;
		}

		containers[i].appendChild(containerChild);
	}
}
