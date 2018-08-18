class Objeto {
	constructor(x, y){
		this.pos = createVector(x, y);

		// podem tanto ser outros Objetos quanto Formas
		this.componentes = [];
	}

	draw(){
		push();
		translate(this.pos.x, this.pos.y);
		this.componentes.forEach(
			(item, index) => {
			item.draw();
		});
		pop();
	}

	// ??
	update(){

	}
}