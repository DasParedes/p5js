/*
 * To Do:
 * Modo 2 jogadores ? 
 *
 *
 *
 */



var plates = [];
var body;
var bullets = [];
var targets = [];

//var CENTER_BODY = false;
var CENTER_BODY = true;

// Teclas pressioanadas no momento
var keys = [];


function setup(){
	createCanvas(600, 600);

		
	plates.push( new Plate(450, 80, 250, .03));
	plates.push( new Plate(100, 100, 500, .05));
	plates.push( new Plate(120, 520, 400, .04));
	plates.push( new Plate(420, 350, 350, .03));
	body = new Body(width/2, height/2);

	targets.push(new Body(width/2 - 50, height/2 - 50));
	frameRate(30);
}

function draw(){
	background(55);
	push();
	if(CENTER_BODY){
		translate(width/2, height/2);
		rotate(body.angle);
		translate(-body.pos.x, -body.pos.y);
	}

	for(var i=0; i<width; i += width/10){
		line(i, 0, i, height);
	}
	for(var j=0; j<height; j+= height/10){
		line(0, j, width, j);
	}
	plates.forEach( (item, index, array ) => {
		item.update();
		item.draw();
		if(item.isInside(body)){
			item.effect_rotation(body);
		}
		for(i=0; i<targets.length; i++){
			if(item.isInside(targets[i])){
				item.effect_rotation(targets[i]);
			}
		}
	});

	body.update();
	body.controls(keys);
	body.draw();
	if(body.shoot){
		bullets.push( new Bullet(body.pos.x, body.pos.y, createVector(0, -10).rotate(-this.body.angle)));
		console.log("shoot!");
	}

	bullets.forEach( (b, index, array ) => {
		b.update();
		b.draw();
	});

	targets.forEach( (t) => {
		t.update();
		t.draw();
		bullets.forEach( (b) => {
			if(t.collision(b)){
				t.acertado = true;
				fill(255, 0, 0);
				text("Bang!", 10, 10, 30);
			}
		});
	});

	

	for(var i=bullets.length; i>0; i--){
		if(bullets[i-1].out_limits()){
			//bullets.splice(i, 1);
		}
	}
	pop();
}

// Funções para atualizar as teclas pressionadas no momento
document.addEventListener("keydown", (event) => {
	if(keys.indexOf(event.key) == -1){
		keys.push(event.key.toLowerCase());
	}
});

document.addEventListener("keyup", (event) => {
	keys.splice(keys.indexOf(event.key), 1);
})