// -------------------
// controla a entrada e saída das teclas do teclado
// armazena o code das teclas pressionadas para ter mais de uma tecla ao mesmo tempo
var keys = [];

document.addEventListener("keydown", function(event){
	// indexOf retorna -1 se não encontrar o argumento no array
	if( keys.indexOf(event.code) < 0){
		keys.push(event.code);
	}
});

document.addEventListener("keyup", function(event){
	keys[ keys.indexOf(event.code) ].thrust = false;
            
	keys.splice( keys.indexOf(event.code) );
});

function action(obj, controls){
	keys.forEach( function(key_code){
		if(controls[key_code] != undefined){
			controls[key_code].forEach( (engine) => {
				engine.thrust = true;
			});
		}
	});
};

function Antigo_action(){
	keys.forEach( function(code){
	console.log(code);
		switch(code){
			case "KeyQ":
				obj.applyForce(forcaAntiHorario);
				break;
			case "KeyE":
				obj.applyForce(forcaHorario);
				break;
			case "KeyW":
				obj.applyForce(forcaParaFrente);
				break;
			case "KeyS":
				obj.applyForce(forcaParaTras);
				break;
			case "KeyD":
				obj.applyForce(forcaLateralEsq);
				break;
			case "KeyA":
				obj.applyForce(forcaLateralDir);
				break;
		}
	});
};
