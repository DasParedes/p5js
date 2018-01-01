let angle = 0;
let w = 400;
let h = 400;

var movim = function(vx, vy, vz){
	this.x = vx;
	this.y = vy;
	this.z = vz;
}

var mov = new movim(0, 0, 0);

function setup(){
	createCanvas(w, h, WEBGL);
}

function draw(){
	background(175);

	rectMode(CENTER);
	noStroke();
	fill(0, 0, 255);
	/*
	// original
	// translate(0, 0, mouseX);
	rotateX(angle);
	rotateY(angle * 0.3);
	rotateZ(angle * 1.2);
	rect(0, 0, 150, 150, 50, 50);
	//torus(50, 10);

	angle += 0.07;
	*/

	// meus tesntes
	/*
	var rot = 0.02;
	rotateX(PI/3);
	push();
	translate(mov.y, mov.x, mov.z);
	rect(0, 0, 300, 300);
	pop();

	if(keyIsPressed == true){
		console.log("true");
		makeMov();
	}*/
	/*
	rotateY(angle * 0.7);
	rotateX(angle * 0.5);
	rotateX(angle * 0.1);
	angle += 0.1;
	*/
	angle = 0.01;
	rotateY(angle * (mouseX - w/2));
	rotateX(-angle * (mouseY - h/2));
	fill(100);
	sphere(50);
	

	fill(0, 0, 100);
	var val = 100;
	push();
	translate(val, val, val);
	// width, height and depth
	box(50, 100, 150);	
	pop();

	push();
	translate(-val, val, -val);
	box(50, 100, 75);	
	pop();

	push();
	translate(-val, -val);
	box(50, 100, 75);	
	pop();

	push();
	translate(val, -val);
	box(50, 100, 75);	
	pop();
	// red
	stroke(150,0,0);
	line(-w, 0, 0, w*2, 0, 0);
	// green
	stroke(0, 150, 0);
	line(0, -h/2, 0, 0, h, 0);
	// blue
	stroke(0, 0, 150);
	line(0, 0, -150, 0, 0, 150);
	
}

function keyPressed(){
	
}



function makeMov(){
	//console.log(key);
	//console.log(keyCode);
	//console.log(keyCode === 'w');
	//console.log(key);
	//console.log(key == 'w');
	//console.log(key == 'W');
	switch(key){
		case 'W': mov.x--; console.log("em frente!"); break;
		case 'S': mov.x++; break;
		case 'D': mov.y++; break;
		case 'A': mov.y--; break;
		default: // nothing;
	}
}