function ChildAppender (childElement, containerClass, childYPos, childXPos, childWidth, childHeight) {
		//Placing the containers new children in the right places.
	var containers = document.getElementsByClassName(containerClass);
	for (var i = 0; i < containers.length; i++) {
		//console.log(window.getComputedStyle(containers[i], null).getPropertyValue("position"))
		containers[i].style.position = "relative";
		var containerChild = document.createElement(childElement);
		containerChild.className = "CA"+childElement;
		containerChild.id = containerChild.className+i;

			//Make this change to css file instead in future versions for efficiency
		containerChild.style.position = 'absolute';

		if (childWidth && childHeight) {
			containerChild.width = containers[i].offsetWidth*childWidth;
			containerChild.height = containers[i].offsetHeight*childHeight;
		}

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