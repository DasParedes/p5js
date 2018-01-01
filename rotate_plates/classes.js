class Plate{
	constructor(x, y, diameter, vel_rotate){
		this.pos = createVector(x, y);
		this.rotate = vel_rotate;
		this.angle = 0;
		this.diameter = diameter;
	}

	draw(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);
		fill(150, 150, 250);
		ellipse(0, 0, this.diameter);
		stroke(255, 0, 0);
		line(0, -this.diameter/2, 0, this.diameter/2);
		pop();
	}

	update(){
		this.angle += this.rotate;
	}
}