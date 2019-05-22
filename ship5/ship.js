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

  applyForce(f, pos){
    //  experimental
    //  force: Force;
    //    Force.pos: p5.Vector
    //    Force.force: p5.Vector
    var force = new Force(pos.x, pos.y, f.x, f.y);
    var distance = p5.Vector.sub(this.center_of_mass, force.pos);

    if (distance.mag() != 0){
      // https://pt.wikipedia.org/wiki/Proje%C3%A7%C3%A3o_de_um_vetor

      var diff_angle = (distance.heading() + force.force.heading()) % 180;
      var total_angle = (distance.heading() - force.force.heading()) % 180;

      // this work to the main Engines
      var module_force = diff_angle == 0 ? 1 : diff_angle / Math.abs(diff_angle);

      // this work to the laterals motors
      //var module_force = total_angle == 0 ? 1 : total_angle / Math.abs(total_angle);

      var perpendicular_distance = distance.copy().rotate(PI/2).normalize();
      var angle = perpendicular_distance.angleBetween(force.force);

      console.log('diff: ' + diff_angle);
      console.log('total: ' + total_angle);
      console.log('angle: ' + angle);

      // angle between distance and the force
      var angleVector = 90 - abs(distance.heading() - force.force.heading());
      
      var perpendicular_force = perpendicular_distance.mult(force.force.mag());

      var rotacional_force = perpendicular_force.mag() * distance.mag() * module_force;

      // pra arrumar a direção da rotação. 
      // p5.Vector.angleBetween() não faz distinção horário ou anti-horário      

      console.log('rotate force: ' + rotacional_force );

      this.accelAng += rotacional_force / (this.mass * PI * distance.mag());

    }
    console.log('accelAng: ' + this.accelAng);
    console.log('force.mag: ' + force.force.mag());
    console.log('-----------------');

    // Linear Acceleration = a = f /m;
    this.accel.add( p5.Vector.div(force.force, this.mass));
  }

  // atualiza os atributos do obj / Component
  update(){
    this.unids.forEach( (unity) => {
      if( (unity instanceof Propeller)){
        //console.log(unity);
        if(unity.thrust){
            console.log(unity);
          this.applyForce(unity.force, unity.pos);
        }
      }
    });
    console.log('=====================');
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
    this.unids.forEach( (unity) => {
      if( (unity instanceof Propeller)){
        if(unity.thrust){
          unity.display();
          unity.thrust=false;
        }
      }
    });

    pop();
  }
}
