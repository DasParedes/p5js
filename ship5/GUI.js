class Button{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.r = 100;
		this.g = 100;
		this.b = 100;

		this.text = ''
		// objeto fixo ?
		this.fixed = true;

		// is be dragged
		this.dragged = false;

		this.center = false;
	}

	display(){
		if (this.center){
			push();
			translate(-this.x/2, -this.y/2);
		}
		fill(this.r, this.g, this.b);
		rect(this.x, this.y, this.width, this.height);
		text(this.text, this.x, this.y);
		if (center)
			pop();
	}

	// function of the button
	action(){
		this.r = 200;
		this.g = 200;
		this.b = 200;
	}

	disAction(){
		this.r = 100;
		this.g = 100;
		this.b = 100;
	}

	// 
	mouseHover(){
		this.r = 150;
		this.g = 150;
		this.b = 150;
	}
}

class Component{
	constructor(){
		this.lista = [];
	}

	addObj(obj){
		this.lista.push(obj);
	}

	display(){
		this.lista.forEach( function(obj){
			obj.display();
		});
	}

	isInside(){
		var reference;
		this.lista.forEach( function(current, index, array, thisArg){
			console.log(mouseX + " " + mouseY);
			if(current.x + current.width > mouseX &&
				 current.x < mouseX &&
				 current.y + current.height > mouseY &&
				 current.y < mouseY){
					if(typeof(current.isInside) === "Function"){
						reference = current.isInside();
					}else{
					 	reference = current;
					}
				 }
		});
		return reference;
	}
}

class HUD {
	constructor(){
		this.actual = null;
		this.lista = [];
		this.mouseHover = [];
		this.target = null;
	}

	addAba(obj){
		this.lista.push(obj);
	}

	isInside(){
		return this.actual.isInside();
	}

	mouseDragged(){
		this.actual.mouseDragged();
	}

	display(){
		if( this.actual ){
			this.actual.display();
		}
	}

	mouseOver(){
		let target = this.isInside();
		this.mouseHover.indexOf(target);
		if (target != null){
			target.mouseHover();
		}
	}
}
