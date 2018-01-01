class Propulsao {
	
	constructor(){
		this.jatos = [];
	}

	addProp(p){
		this.jatos.push(p);
	}

	display(){
		this.jatos.foreach( function(v){
			v.display();
		});
	}
}