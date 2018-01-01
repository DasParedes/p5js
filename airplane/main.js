var w = 1080, h = 900;

var aviao;

var wings = [];

var max_empuxo = 1;
var max_pitch = 50;
var max_vel = 5;
var gravity = new p5.Vector(0, 1);

//make_wing(30, 20);
//wings.concat(wings, make_wing(30, 20));
//wings.push.apply( wings, make_wing(30, 20));

/*
		lift force: (see the aditionals in the end of the page)
		https://en.wikipedia.org/wiki/Lift_(force)

		f empuxo -> ++ f aceleração
		f aceleração -> ++ v velocidade
		v velocidade -> ++f lift && ++f arrasto

		f arrasto -> --f aceleração
		f lift -> ++ v sustentação
	*/

/* @Class Airplane
*/
class Airplane{
	constructor(pos, mass){
		this.pos = pos;
		this.mass = mass;
		this.vel = new p5.Vector(0, 0);
		this.accel = new p5.Vector(0, 0);
		this.empuxo = 0;
		this.pitch = 0;
		this.angle = 0;
	}

	force(force){
		this.accel.add( force.div(this.mass) );
	}

	update(){
		if(this.empuxo > max_empuxo){
			this.empuxo = max_empuxo;
		} else if(this.empuxo < -max_empuxo){
			this.empuxo = -max_empuxo;
		}

		if(this.pitch > max_pitch){
			this.pitch = max_pitch;
		} else if(this.pitch < -max_pitch){
			this.pitch = -max_pitch;
		}

		this.force( (new p5.Vector(this.empuxo, 0)).rotate(this.angle));

		this.angle += this.pitch / this.mass;

		this.vel.add(this.accel);

		if(this.vel.x > max_vel){
			this.vel.x = max_vel;
		} else if(this.vel.x < -max_vel){
			this.vel.x = -max_vel;
		}
		if(this.vel.y > max_vel){
			this.vel.y = max_vel;
		} else if(this.vel.y < -max_vel){
			this.vel.y = -max_vel;
		}
		/*
		var temp = new p5.Vector(this.vel.x, this.vel.y);
		this.pos.add(temp.rotate(this.angle));
		*/
		this.pos.add( this.vel );
	}

	draw(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);

		fill(255);
		rect(0, 0, -50, 10);
		rect(0, -10, 5, 30);
		beginShape();
		vertex(-50, 0);
		vertex(-55, -20);
		vertex(-40, 0);
		endShape();

		this.debug();
		pop();
	}

	debug(){
		console.log("Debug!");
		stroke(255, 0, 0);
		line(0, 5, this.empuxo * 10, 5);
		console.log("empuxo: " + this.empuxo);
		stroke(0, 255, 0);
		line(-50, 5, -50, 5 + this.pitch * 10);
		console.log("pitch: " + this.pitch);
		console.log("pos: " + this.pos.x + "," + this.pos.y);
	}
}

function controls(){
	keys.forEach( (item, index, array) => {
		switch(item){
			case "d":
				aviao.empuxo+= .1;
				break;
			case "a":
				aviao.empuxo-= .1;
				break;
			case "w":
				aviao.pitch++;
				break;
			case "s":
				aviao.pitch--;
				break;
		}
	});
}


function setup(){
	createCanvas(w, h);
	aviao = new Airplane( new p5.Vector(w/2, h/2), 100 );

	//frameRate(20);
}

function draw(){
	background(55);
	controls();
	aviao.force( gravity );

	aviao.update();
	aviao.draw();
	

	
	//console.table(keys);
}










/*
function make_wing(altura_maxima, ponto_curvatura){
	var max_alt = altura_maxima;
	var metade = ponto_curvatura;
	var asas = [];
	console.log("inicio");
	for(i=-100; i<metade; i++){
		var alt = map(i, -100, metade, 0, HALF_PI);
		console.log(alt);
		asas.push( sin( alt ) * max_alt );
		//vertex(i, wing[wing.length]);
	}

	vertex(metade, -max_alt);
	for(i=metade; i<50; i++){
		var alt = map(i, metade, 50, 0, HALF_PI);
		asas.push( cos(alt) * max_alt);
		//vertex(i, cos(alt) * -max_alt);
	}
	//vertex(metade, -5);
	//vertex(-100, 0);
	//endShape();
	console.log("fim");
	return asas;
}*/
