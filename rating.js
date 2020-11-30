(function notation() {
	for (i=1;i<6;i++) {
		var img			=document.getElementById('vote'+i);
		img.onmouseover	=function() {Noter(this.id);};
		img.onmouseout	=function() {Denoter(this.id);}
	}
})()

function Noter(Star) {
	StarNb=Star.slice(4);
	for (i=1;i<(StarNb*1)+1;i++) {
		document.getElementById('vote'+i).classList.remove("far");
		document.getElementById('vote'+i).classList.add("fas");
	}
}

function Denoter(Star) {
	StarNb=Star.slice(4);
	for (i=1;i<(StarNb*1)+1;i++) {
		document.getElementById('vote'+i).classList.remove("fas");
		document.getElementById('vote'+i).classList.add("far");
	}
}