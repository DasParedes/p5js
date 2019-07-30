class Button{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.r = 200;
		this.g = 100;
		this.b = 100;

		this.text = ''
		// objeto fixo ?
		this.fixed = true;

		// is be dragged
		this.dragged = false;

		this.center = false;
		
		this.image_function = null;

		this.function = function(){};
	}

	display(){
		push();
		translate(this.x, this.y);
		
		fill(this.r, this.g, this.b);
		rect(0, 0, this.width, this.height);
		text(this.text, this.x, this.y);
		
	    
		if(this.image_function != null){
			translate(this.width/2, this.height/2);
		    this.image_function();
		}
		pop();
	}

	// function of the button
	action(){
		this.r = 200;
		this.g = 200;
		this.b = 200;

		return this.function;
	}

	disAction(){
		this.r = 200;
		this.g = 100;
		this.b = 100;
	}

	// 
	realce(){
		this.r = 100;
		this.g = 100;
		this.b = 200;
	}

	desRealce(){
		this.disAction();	
	}
}

class Texto{
	constructor(x, y, txt){
		this.pos = createVector(x,y);
		this.txt = txt;
		this.width = 0;
		this.height = 0;

	}

	display(){
		push();
		translate(this.pos.x, this.pos.y);
		fill(0,0,0);
		textSize(20);
		text(this.txt, -4, 40);
		pop();
	}
}

class Component{
	constructor(x, y){
		this.lista = [];
		this.x = x;
		this.y = y;
		this.width = null;
		this.height = null;
		this.color = null;

		this.name = '';
	}

	addObj(obj){
		this.lista.push(obj);
	}
    
    add(obj){
        this.lista.push(obj);
    }
    
	display(){
	    push();
	    translate(this.x, this.y);
	    if(this.width && this.height){
	    	if(this.color)
	    		fill(this.color);
	    	rect(0, 0, this.width, this.height);
	    }

		this.lista.forEach( function(obj){
			obj.display();
		});
		pop();
	}

	isInside(){
		var reference = this;
		var offsetX = mouseX - this.x;
		var offsetY = mouseY - this.y;
		
		this.lista.forEach( function(current, index){
			if(current.x + current.width > offsetX &&
				 current.x < offsetX &&
				 current.y + current.height > offsetY &&
				 current.y < offsetY){
					if(typeof(current.isInside) === "function"){
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
		this.action = function(){}; // manter ??
		this.actual = null;
		this.lista = [];
		this.mouseHover = null;
		this.target = null;
	}

	addAba(obj){
		this.lista.push(obj);
	}

	isInside(){
		var target = null;

		if (this.actual)
			target = this.actual.isInside();
		console.log('target: ');
		console.log(target);
		return target;	
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
