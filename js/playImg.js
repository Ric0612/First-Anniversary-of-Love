var btn = document.getElementById("heartTxt");
btn.style.opacity = 0;
var btnVal = 0;

function showImage(){
	// responsive landscape sizing, centered
	if(myImage){
		myImage.style.display = "block";
		myImage.style.margin = "0 auto";
		myImage.style.width = "min(90vw, 800px)";    // scale down on small screens, cap at 800px
		myImage.style.height = "auto";
		myImage.style.maxHeight = "60vh";            // avoid overflowing tall screens
		myImage.style.aspectRatio = "16/9";          // keep landscape ratio
		myImage.style.objectFit = "cover";
		myImage.style.objectPosition = "center";
	}

	myImage.setAttribute("src", imageArray[imageIndex]);
	myTxt.innerHTML = txtArray[imageIndex];

	imageIndex++;
	if(imageIndex >= len){
		imageIndex = 0;
	}
}

function play(){
	if(t == 0){
		myImage.setAttribute("src", "");
		myTxt.innerHTML = "";
		imageIndex = 0;
		clearInterval(showImageInterval);

		// reveal the "View" button (fade-in)
		var view = document.getElementById("viewBtn");
		if(view){
			view.style.display = "inline-block";
			view.style.opacity = 0;
			let vOp = 0;
			const vf = setInterval(function(){
				vOp += 0.12;
				view.style.opacity = vOp;
				if(vOp >= 1){
					view.style.opacity = 1;
					clearInterval(vf);
				}
			}, 40);
		}
	}
	flag = 1 - flag;
	document.getElementById("typeDiv").style.opacity = flag;
	document.getElementById("imgTxt").style.opacity = 1 - flag;
	if(t == 0){
		// set (or keep) the carousel interval
		setInterval(showImage, 2500);
	}
	t++;
}

function preshowImage(){
	document.getElementById("imgTxt").style.opacity = 0;
	// responsive landscape sizing for the preview as well
	if(myImage){
		myImage.style.display = "block";
		myImage.style.margin = "0 auto";
		myImage.style.width = "min(90vw, 800px)";
		myImage.style.height = "auto";
		myImage.style.maxHeight = "60vh";
		myImage.style.aspectRatio = "16/9";
		myImage.style.objectFit = "cover";
		myImage.style.objectPosition = "center";
	}
	myImage.setAttribute("src", imageArray[imageIndex]);
	myTxt.innerHTML = txtArray[imageIndex];
	imageIndex++;
	if(imageIndex >= len){
		imageIndex = 0;
	}
}

function buttonFadeIn(){
	if(btnVal < 1){
		btnVal += 0.025;
		btn.style.opacity = btnVal;
	}
	else{
		clearInterval(buttonInterval);
		if(ok == 3){
			ok += 1;
		}
	}
}

function event(){

	showImageInterval = setInterval(preshowImage, 100);

	imgInterval = setInterval(function (){
		if(ok == 3){
			setTimeout(function(){buttonInterval = setInterval(buttonFadeIn, 50);}, 1500);
			clearInterval(imgInterval);
		}
	}, 50);
}

var showImageInterval;
var imgInterval;
var buttonInterval;

event();
