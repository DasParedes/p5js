var room;
var h = 400;
var w = 500;

var keys = [];

var eu = null;
const CENTER_BODY = true;
var atual_room = null;

function setup(){
	createCanvas(w, h);
	eu = new Body(0, 0);
	eu = set_body(eu);
	atual = set_example_house();

	eu.pos.x = atual.pos.x + atual.largura/2;
	eu.pos.y = atual.pos.y + atual.altura/2;

	console.log("eu: " + eu.pos);
	console.log("atual pos: " + atual.pos);
	console.log("atual size: " + atual.size);
	frameRate(20);
}

function draw(){
	push();
	if(CENTER_BODY){
		translate(width/2, height/2);
		rotate(eu.angle);
		translate(-eu.pos.x, -eu.pos.y);
	}
	background(150);

	atual.draw_absoluto();
	atual.draw_adjacentes();

	eu.update();
	//eu.isOut();
	eu.draw();
	
	debug();
	pop();
	//stop();
}

document.addEventListener("keydown", (event) => {
	if(keys.indexOf(event.key) == -1){
		keys.push(event.key.toLowerCase());
	}
});

document.addEventListener("keyup", (event) => {
	keys.splice(keys.indexOf(event.key), 1);
});


function set_body(body){
	body.update = function(){
		this.controls(keys);
		this.vel.add(this.accel);

		var saiu = atual.isOut(p5.Vector.add(eu.pos, eu.vel));
		if(saiu){
			console.log("Is Out! pela " + saiu);
			console.log("Status: " + atual.adjacentes[saiu-1]);

			if( atual.adjacentes[saiu-1] === undefined ){
				console.log("Here");
				if(CENTER_BODY){
					this.pos.sub(this.vel.rotate(-this.angle));
				} else {
					this.pos.sub(this.vel.rotate(this.angle));
				}
			} else {
				console.log("indo para " + atual.adjacentes[saiu-1].nome);
				var next = atual.adjacentes[saiu-1];
				next.pos = atual.pos;

				if(saiu == 1){
					next.pos.y -= next.size.y;
				} else
				if(saiu == 2){
					next.pos.x += atual.size.x;
				} else
				if(saiu == 3){
					next.pos.y += atual.size.y;
				} else
				if(saiu == 4){
					next.pos.x -= next.size.x;
				}
				atual = atual.adjacentes[saiu-1];

			}
		} else {
			if(CENTER_BODY){
				this.pos.add(this.vel.rotate(-this.angle));
			} else {
				this.pos.add(this.vel.rotate(this.angle));
			}
			this.shoot = false;
		}
		
		

		frameRate(5);
	};

	// out of the screen
	body.isOut = function(){
		if(this.pos.x < 0){
			this.pos.x = height-1;
		} else
		if(this.pos.x > height){
			this.pos.x = 1;
		} else
		if(this.pos.y < 0){
			this.pos.y = width-1;
		} else
		if(this.pos.y > width){			
			this.pos.y = 1;
		}
	};
	return body;
}

function stop(){
	noLoop();
}

function debug(){
	// centras do personagem
	stroke("#f22");
	line(eu.pos.x, 0, eu.pos.x, h);
	line(0, eu.pos.y, w, eu.pos.y);
}