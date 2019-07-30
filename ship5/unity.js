class Based {
  constructor(x,  y, mass){
    this.pos = createVector(x, y);
    this.posX = x;
    this.posY = y;
    this.mass = mass;
    this.size = 20;
    this.width = 20;
    this.height = 20;
  }

  display(){
    translate(this.posX, this.posY);
  }
}

class Unity extends Based{

  // posição = centro do objeto
  constructor(x,  y, mass){
    super(x, y, mass);
  }

  display(){
    push();
    super.display();

    fill(150);
    stroke(5);
    // escala = distância do centro até a lateral
    var scl = this.size/2;
    if (this.size != undefined)
      rect( -scl, -scl, this.size, this.size);
    else 
      rect( -10, -10, 20, 20);
    pop();
  }
}
