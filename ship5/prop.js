// one propulsor
class Propeller extends Unity {

	constructor(x, y, mass, force){
        // force: p5.Vector
		super(x, y, mass);
		this.thrust = false; //false;
		this.force = force;
	}

    display(){
      	translate(this.posX, this.posY);
        rotate(this.force.heading()+PI/2);
	}
}

class Control_Engine extends Propeller {
    constructor(x, y){
        var mass = 2;
        var force = createVector(0, -.1);
        super(x, y, mass, force);
    }
    
    display(){
        push();
        super.display();
        fill(55);
        
        beginShape();
        vertex(6, -10);
        vertex(2, -5);
        vertex(2, 4);
        vertex(-2, 4);
        vertex(-2, -5);
        vertex(-6, -10);
        endShape();

        if(this.thrust){
        	fill(255, 100, 100);
        	beginShape();

            vertex(0, 5);
        	vertex(5,10);
        	vertex(0,20);
        	vertex(-5, 10);
        	vertex(0, 5);
        	
            endShape();
      	}
      	pop();
    }
}

class Main_Engine extends Propeller {
    constructor(x, y){
        var mass = 10;
        var force = createVector(0, -10);
        super(x, y, mass, force);
    }
    
    display(){
        push();
        super.display();
        
        fill(40);
        beginShape();
        vertex(10, -10);
        vertex(4, -4);
        
        vertex(8, 8);
        vertex(-8, 8);
        
        vertex(-4, -4);
        vertex(-10, -10);
        vertex(10, -10);
        endShape();

        if(this.thrust){
        	fill(255, 100, 100);
        	beginShape();
        	/*
        	curveVertex(0, 8);
        	curveVertex( 10, 18);
        	curveVertex(  0, 30);
        	curveVertex(-10, 18);
        	curveVertex(0, 8);
        	*/
        	vertex(0, 8);
        	vertex(10, 14);
        	vertex( 0, 30);
        	vertex(-10, 14);
        	vertex( 0, 8);
        	endShape();
      	}
      	pop()
    }
}

// classe container of all the propulsores
class Propulsao {

	constructor(){

	}

	addPropulsor(p, key){
		this.lista.push([p, key]);
	}

  display(){
    this.jatos.foreach( function(v){
      v.display();
    });
  }

	// uma ship, array of keysCode
	activators(ship, keys){

	}
}
