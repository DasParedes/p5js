class Plate{
	constructor(x, y, diameter, vel_rotate){
		this.pos = createVector(x, y);
		this.rotate = vel_rotate;
		this.angle = 0;
		this.diameter = diameter;
		this.shoot = false;
	}

	draw(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);
		fill(150, 150, 250);
		ellipse(0, 0, this.diameter);
		stroke(255, 0, 0);
		line(0, -this.diameter/2, 0, this.diameter/2);
		line(-this.diameter/2, 0, this.diameter/2, 0);
		pop();
	}

	update(){
		this.angle += this.rotate;
	}

	isInside(obj){
		var diameter = this.diameter;
		// Check if the obj is inside the circle
		// to Rectangles:
		/*
		if( obj.pos.x < (this.pos.x + diameter/2) && obj.pos.y < (this.pos.y + diameter/2) && 
			obj.pos.x > (this.pos.x - diameter/2) && obj.pos.y > (this.pos.y - diameter/2)		){
			return true;
		} else {
			return false;
		}*/
		// To circles:
		if( this.diameter/2 > createVector(obj.pos.x -this.pos.x, obj.pos.y -this.pos.y ).mag()){
			return true;
		} else {
			return false;
		}
	}

	// movimenta o obj através do carrossel do prato
	effect_rotation(obj){
		var distance = createVector((obj.pos.x - this.pos.x),(obj.pos.y - this.pos.y));
		distance.rotate(this.rotate);
		obj.pos = createVector(this.pos.x, this.pos.y).add(distance);
		obj.angle+= -this.rotate;
	}
}



class Body{
	constructor(x, y){
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.accel = createVector(0, 0);
		this.angle = 0;
		this.size = 20;
		this.r = 255;
		this.g = 0;
		this.b = 0;
		this.acertado = false;
	}

	update(){
		this.vel.add(this.accel);
		if(CENTER_BODY){
			this.pos.add(this.vel.rotate(-this.angle));
		} else {
			this.pos.add(this.vel.rotate(this.angle));
		}
		this.shoot = false;
	}

	draw(){
		if(this.acertado){
			fill(255, 200, 200);
		} else {
			fill(255, 0, 0);
		}
		if(CENTER_BODY){
			push();
			translate(this.pos.x, this.pos.y);
			rotate(-this.angle);
			this.desenha_corpo();
			pop();
		} else {
			push()
			translate(this.pos.x, this.pos.y);
			rotate(this.angle);
			this.desenha_corpo();
			pop();	
		}
		this.acertado = false;
	}

	desenha_corpo(){
		var size = this.size;
		// corpo
		//fill(255, 0, 0);
		//fill(this.r, this.g, this.b);
		rect(-size/2, -size/2, size, size);

		// olho
		fill(240);
		ellipse(-4, -5, 5);
		ellipse(+4, -5, 5);
	}

	controls(array){
		this.vel = createVector(0, 0);
		array.forEach( (item, index, array) => {
			switch(item.toLowerCase()){
				case 'w':
					this.vel.y = -2;
					break;
				case 's':
					this.vel.y = +2;
					break;
				case 'd':
					this.vel.x = +2;
					break;
				case 'a':
					this.vel.x = -2;
					break;
				case 'e':
					this.angle -= 0.05;
					break;
				case 'q':
					this.angle += 0.05;
					break;
				case ' ':
					this.shoot = true;
					break;
			}
		});
		this.vel.mult(2);
	}


	keyup(tecla){
			switch(tecla){
				case 'w':
					this.vel.y = 0;
					break;
				case 's':
					this.vel.y = 0;
					break;
				case 'd':
					this.vel.x = 0;
					break;
				case 'a':
					this.vel.x = 0;
					break;
			}
	}

	// with circles objects
	collision(obj){
		var size = this.size;
		if( obj.pos.x < (this.pos.x + size/2) && obj.pos.y < (this.pos.y + size/2) &&
			obj.pos.x > (this.pos.x - size/2) && obj.pos.y > (this.pos.y - size/2)){
			return true;
		} else {
			return false;
		}
	}
}

class Bullet{
	constructor(x, y, vel){
		this.pos = createVector(x, y);
		this.vel = vel;
		this.angle = this.vel.heading();
	}

	draw(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle - HALF_PI);
		fill(255, 0, 0);
		rect(-1, 0, +1, 10);
		pop();
	}

	update(){
		this.pos.add(this.vel);
	}

	out_limits(){
		if( this.pos.x > width 	|| this.pos.x < 0 && 
			this.pos.y > height 	|| this.pos.y < 0	){
			return true;
		} else {
			return false;
		}
	}
}