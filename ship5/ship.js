const DEBUG = false;

function pre_build_ship(ship, controls){
  // adiciona as diversas unidades estruturais a nave
  // linha de comprimento 5
  for(var i=0; i<5; i++){
    ship.addUnity( new Unity(i * 20, 0, 20) );
  }
  // coluna de comprimento 4
  for(var i=1; i<5; i++){
    ship.addUnity( new Unity(2 * 20, i * 20, 20) );
  }
  
  // propulsores e localização
  var soft_propellers = [
  // pos.x, pos.y, rotate, atuador
    [ship.cmX+20, 20*4, -PI/2, 'KeyE'],
    [ship.cmX-20, 20*4, PI/2, 'KeyQ'],
    [ship.cmX, -20, PI, 'KeyS'],
    [ship.cmX-20, 20*1, PI/2, 'KeyA'],
    [ship.cmX+20, 20*1, -PI/2, 'KeyD'],
  ];

  soft_propellers.forEach( function(soft_prop){
    let prop_control = new Control_Engine( soft_prop[0], soft_prop[1]);
    prop_control.force.rotate(soft_prop[2]);
    ship.addUnity( prop_control );

    if( controls[soft_prop[3]] == undefined) {
      controls[soft_prop[3]] = [];
    }
    controls[ soft_prop[3] ].push(prop_control);  
  });

  var strong_propellers = [
    [ship.cmX, 20*5, 0, 'KeyW'],
    [20*0      , 20, 0, 'KeyW'],
    [20*4   , 20, 0, 'KeyW']
  ]
  
  strong_propellers.forEach( function(strong_prop){
    let engine = new Main_Engine( strong_prop[0], strong_prop[1]);
    engine.force.rotate(strong_prop[2]);
    ship.addUnity( engine );

    if( controls[strong_prop[3]] == undefined) {
      controls[strong_prop[3]] = [];
    }
    controls[ strong_prop[3] ].push(engine);  
  });
}


class Ship {
  constructor(x, y){
	// atributos para velocidade 'linear'
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.accel = createVector(0, 0);
  this.mass = 0;

  // all parts that compose the ship
  this.unids = [];

	// atributos para velocidade angular
	this.theta = 0;
	this.velAng = 0;
	this.accelAng = 0;
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

  perpendicular_force(f, p){
    let force = null;
    
    p = p.copy().normalize();
    let p2 = p.copy().rotate(PI/2);

    let escalar_product = (f.x * p2.x) + (f.y * p2.y);
    let f2 = p5.Vector.mult(p2, escalar_product / pow(p2.mag(), 2) );
    force = f2;
    
    if (DEBUG){
      console.log('px : %f, py : %f', p.x, p.y);  
      console.log('p2x: %f, p2y: %f', p2.x, p2.y);

      console.log("f''x:%f, f''y:%f", f2.x, f2.y);
      console.log('p2 and f angle: %f', p2.angleBetween(f));  
      
      console.log('force angle: %f', force.heading());
      console.log('pos. angle: %f', p.heading());
      console.log('pos.2 angle: %f', p2.heading());
    }
    return force;
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
      
      // this work to the main Engines
      let dist_angle = distance.heading();
      let force_angle = force.force.heading();
      
      if(sin(force_angle - dist_angle) < 0){
        var module_force = 1;
      } else 
      if (sin(force_angle - dist_angle) > 0){
        var module_force =-1;
      } else {
        var module_force = 0;
      }

      //let perpendicular_distance = distance.copy().rotate(PI/2).normalize();
      
      //let perpendicular_force = this.perpendicular_force(force.force, perpendicular_distance);
      let perpendicular_force = this.perpendicular_force(force.force, distance);
      
      let rotacional_force = perpendicular_force.mag() * pow(distance.mag(), 2) * module_force;

      var escala = 1000;
      // Update rotate acceleration
      this.accelAng += rotacional_force / (this.mass * PI * escala); //* distance.mag());
    }

    // Linear Acceleration = a = f /m;
    this.accel.add( p5.Vector.div(force.force, this.mass));
  }

  // atualiza os atributos do obj / Component
  update(){
    this.unids.forEach( (unity) => {
      if( (unity instanceof Propeller)){

        if(unity.thrust){
            console.log(unity);
          this.applyForce(unity.force, unity.pos);
        }

      }
    });
    
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
