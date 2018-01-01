class Obj {
  constructor(x, y){
	// atributos para velocidade 'linear'
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.accel = createVector(0, 0);
  this.mass = 0;

  this.unids = [];

	// atributos para velocidade angular
	this.theta = 0;
	this.velAng = 0;
	this.accelAng = 0;

  // this.unitysInteracts = [];
  }

  addUnity(u){
    this.unids.push(u);
    this.totalMass();
    this.centerOfMass();
  }

  totalMass(){
    var total = 0;
    this.unids.forEach( function(u){
		  total += u.mass;
		});
    this.mass = total;
  }

  centerOfMass(){
    // cm = centro de massa
    // Xcm = M1*X1 + M2*X2 + ... + Mn*Xn / M1 + M2 + ... Mn
    var cmx_ = 0; // Mn * Xn
    var cmy_ = 0; // Mn * Yn
    var mt = 0; // massa total

    this.unids.forEach( function(u){
      cmx_ += u.posX * u.mass;
      cmy_ += u.posY * u.mass;
      mt += u.mass;
    });

    this.cmX = cmx_ / mt;
    this.cmY = cmy_ / mt;
  }

  applyForce(force){
    var distance = force.pos.x - this.cmX;

	  var prop = createVector(force.y, distance); // proporção

  	if(distance >= 10 || distance <= 10){
  		var Mo = force.force.mag() * distance * sin( force.force.heading() );
  		// caso a força propulsora fora do eixo seja contrária ao movimento rotatório
  		/*if( abs(Mo + this.velAng) < abs(this.velAng)){
  			console.log("contrário");
  			this.vel.add(Mo);
		  }*/
      // linear force
      // quando mais longe do centro de massa, menos força
      // linear
      var parcialForce = Mo * ( 1 - cos(force));
      // this.vel.add( parcialForce );

      // velocidade angular
		  Mo = Mo / (this.mass * 1000);
		  this.accelAng += Mo;
	  }

	// a = f /m;
	// this.accel.add( force.force.div( this.mass ) );
	var forcaResultante = p5.Vector.mult(force.force, cos( prop.heading() ) );
	var accelTotal = forcaResultante.div( this.mass);
	this.accel.add( accelTotal.rotate(this.theta) );
  }

  // atualiza os atributos do obj / Component
  update(){
    // atualiza posição e velocidade linear
  	this.vel.add( this.accel );
  	this.pos.add( this.vel );

    // atualiza velocidade e rotação angular
  	this.velAng += this.accelAng;
    this.theta += this.velAng;

    // reseta a aceleração linear e angular
    this.accel.mult(0);
  	this.accelAng = 0;
  }

  // mostra na tela todos as partes do objeto
  display(){

    push();
    // mostra todos a partir do topo esquerdo do obj como origem
    // movimenta a origem até a posição do obj
    translate(this.pos.x, this.pos.y);
    // movimenta a origem até o centro de massa
    translate(this.cmX, this.cmY);
    // para rotacionar a name em volta do centro de massa,
    rotate(this.theta);
    // e retorna para o ponto topo esquerdo, com o grid inclidado(theta)
    translate(-this.cmX, -this.cmY);
    // imprime cada uma das partes
    this.unids.forEach( function(u){
		    u.display();
		});

    // imprime o centro de massa
    fill(255, 0, 0);
    noStroke();
    ellipse(this.cmX, this.cmY, 5, 5);


    forcas.forEach( function(f){
      if(f.thrust){
        //f.display();
        f.thrust = false;
      }
    });

    // ! excluir depois
    parcial.display(255);

    pop();
  }
}
