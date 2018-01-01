// one propulsor
class Prop extends Unity {

	constructor(x, y, m, f){
		super(x, y, m);
		this.thrust = false; //false;
		this.force = f;
	}

  display(){
  	push();
  	translate(this.posX, this.posY);
  	fill(255, 10, 10);
    beginShape();
    vertex(0, 0);
    vertex(20, 0);
    vertex(10, 10);
    endShape();

    if(this.thrust){
    	fill(255, 100, 100);
    	beginShape();
    	vertex(10,10);
    	vertex(15,15);
    	vertex(10, 20);
    	vertex(5, 15);
    	endShape();
  	}
  	pop();
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
