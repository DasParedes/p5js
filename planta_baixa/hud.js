class HUD {
	constructor(){
		this.button = [];
	}

	andando(){
		push();
		if(CENTER_BODY){
			translate(width/2, height/2);
			rotate(eu.angle);
			translate(-eu.pos.x, -eu.pos.y);
		}
		background(BG);
		
		atual.draw_absoluto();
		//atual.draw_adjacentes();
		//adjacentes.forEach(item => {item.draw(); });
		atual.adjacentes.forEach(item => {item.draw_absoluto(); });

		eu.update();
		//eu.isOut();
		eu.draw();
		pop();

		//debug();
		
		//stop();
	}

	editando(){

	}
}

function hud_setup(){
	var hud = new HUD();

	hud.button.push(
		createButton('STOP')
			.position(100, 10)
			.mousePressed(stop)
		);
	return hud;
}

function changeBG(BG){
	console.log("Switch");
	if(BG != "255"){
		BG = 255;
	} else {
		BG = 55;
	}
	return BG;
}