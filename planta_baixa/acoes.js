var room;
var h = 400;
var w = 500;

var keys = [];

var eu = null;
const CENTER_BODY = true;
var atual_room = null;


var BG = 150;
var hud;
var mode = 0;
var adjacentes = [];

function setup(){
	createCanvas(w, h);

	hud = hud_setup();
	var but = hud.button.push(
		createButton('Edit', 0)
			.position(10, 5)
			.mousePressed(changeMode)
		);
	console.log(but);

	eu = new Body(0, 0);
	eu = set_body(eu);
	atual = set_example_house();

	eu.pos.x = atual.pos.x + atual.largura/2;
	eu.pos.y = atual.pos.y + atual.altura/2;

	adjacentes = atual.calcula_adjacentes();

	console.log(atual.pos);
	adjacentes.forEach( item => { console.log(item.pos); });

	console.log("eu: " + eu.pos);
	console.log("atual pos: " + atual.pos);
	console.log("atual size: " + atual.size);
	frameRate(20);
}

function draw(){
	switch(mode){
		case 0:
			hud.andando();
			break;
		case 1:		
			hud.editando();
			break;
	}
}

function changeMode(){
	console.log("Mudando modo para");
	switch(mode){
		case 0:
			console.log("Andando");
			mode = 1;
			break;
		case 1:
			console.log("Editando");
			mode = 0;
			break;
	}
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
			adjacentes = atual.calcula_adjacentes();
			
		} else {
			if(CENTER_BODY){
				this.pos.add(this.vel.rotate(-this.angle));
			} else {
				this.pos.add(this.vel.rotate(this.angle));
			}
			this.shoot = false;
		}
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