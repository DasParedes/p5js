// calculate atmosphere ??
// calculate trajectory ??
// moons and others space bodies ??
// resources ??
const GRAVITATIONAL_CONSTANT = 10;

class Planet{
	constructor(x, y, size, mass, color, host){
		this.pos = createVector(x, y);
		this.size = size;
		this.mass = mass;
		this.color = color;
		this.host = host;
		this.velocity = 5000;
	}

	update(){
		// perfect circular orbit
		if (this.host != undefined){
			var distance = p5.Vector.sub(this.pos, this.host.pos);
			distance.rotate(PI/this.velocity);
			this.pos.add(distance.add(this.host.pos).sub(this.pos));
		}
	}

	display(){
		stroke(1);
		
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.size);

		fill('#ff0000');
		ellipse(this.pos.x, this.pos.y, 20);
	}

	force_attraction(obj){
		// gravitational force
		// F = G * mass / distance * distance
		var distance = p5.Vector.sub(this.pos, obj.pos);

		var force = null;
		if (distance.mag() < 1){
			distance.normalize();
		}
		force = distance.copy().normalize().mult(GRAVITATIONAL_CONSTANT * this.mass/distance.mag());
		console.log(force.mag());
		return force
	}
}