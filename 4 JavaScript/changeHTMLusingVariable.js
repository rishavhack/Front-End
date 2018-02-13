document.getElementById('button1').onclick=function () {
	var x,y,z,color;
	x = Math.round(Math.random()*256);
	y = Math.round(Math.random()*256);
	z = Math.round(Math.random()*256);
	color = 'rgb('+x+','+y+','+z+')';
	console.log(color);
	document.getElementById('facebook').style.backgroundColor=color;
}