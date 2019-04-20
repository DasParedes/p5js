class Force {
	constructor(x, y, fx, fy, rot){
		this.thrust = false;
		this.pos = createVector(x, y);
		this.force = createVector(fx, fy);
	}

	display(color){
		stroke(0, 255, 255);
		ellipse(this.pos.x, this.pos.y, 20, 20);
		if(color)
			stroke(color);
		stroke(255, 20, 20);
		strokeWeight(5);
		line(	this.pos.x,
					this.pos.y,
				 	this.pos.x + this.force.x * SCALE,
				 	this.pos.y + this.force.y * SCALE
				);
	}

	soma(f){
		//console.log( p5.Vector.sub(f.pos, this.pos));
		this.pos.add(
				p5.Vector.sub(f.pos, createVector(obj.cmX, obj.cmY) )
				//p5.Vector.sub( f.pos, this.pos )
			);
		this.force.add(f.force);
	}
}