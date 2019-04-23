class Ship {
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

    this.center_of_mass = createVector(this.cmX, this.cmY);
  }

  applyForce(force){
    //  experimental
    //  force: Force;
    //    Force.pos: p5.Vector
    //    Force.force: p5.Vector
    var distance = p5.Vector.sub(this.center_of_mass, force.pos);

    if (distance.mag() != 0){
      // angle between distance and the force
      var angleVector = distance.heading() + force.force.heading();
      
      var perpendicular_force = force.force.copy().normalize();
      perpendicular_force.rotate(angleVector + PI/2);

      perpendicular_force.mult(sin(angleVector) * force.force.mag());

      var rotacional_force = perpendicular_force.mag() * distance.mag();

      // pra arrumar a direção da rotação. 
      // p5.Vector.angleBetween() não faz distinção horário ou anti-horário
      rotacional_force *= angleVector / Math.abs(angleVector);

      this.accelAng -= rotacional_force / (this.mass * PI * distance.mag());
    }

    // Linear Acceleration = a = f /m;
    this.accel.add( p5.Vector.div(force.force, this.mass));
  }

  // atualiza os atributos do obj / Component
  update(){
    // atualiza posição e velocidade linear
  	this.vel.add( this.accel.rotate(this.theta));
  	this.pos.add( this.vel );

    // atualiza velocidade e rotação angular
  	this.velAng += this.accelAng;
    this.theta += this.velAng;

    // reseta a aceleração linear e angular
    this.accel.mult(0);
  	this.accelAng = 0;
  }

  // mostra na tela todos as partes do objeto
  // mostra todos a partir do topo esquerdo do obj como origem
  display(){

    push();
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

    // imprime os jatos dos propulsores ativados
    forcas.forEach( function(f){
      if(f.thrust){
        f.display();
        f.thrust = false;
      }
    });

    pop();
  }
}
