function set_example_house(){
    // retorna o quarto inicial que deve ser o atual
    quarto = new Room('Quarto', 100, 100, 75, 100, "#f4d");
    cozinha = new Room('Cozinha', 10, 50, 100, 100, "#4d0");
    corredor = new Room('Corredor', 250, 200, 100, 50, "#399");
    sala = new Room('sala', 0, 50, 150, 100, "#34d");

    cozinha.adjacentes[0] = corredor;
    cozinha.adjacentes[1] = quarto;
    cozinha.adjacentes[2] = corredor;
    cozinha.adjacentes[3] = sala;

    corredor.adjacentes[0] = quarto;
    corredor.adjacentes[2] = cozinha;

    quarto.adjacentes[0] = cozinha;
    quarto.adjacentes[2] = sala;

    sala.adjacentes[3] = corredor;
    sala.adjacentes[0] = quarto;
    
    return corredor;
}

class Room{
        constructor(name, x, y, altura, largura, color){
            this.name = name;
            this.altura = altura;
            this.largura = largura;
            this.color = color;

            this.adjacentes = [];

            this.visitado = 0;

            //this.pos = createVector(0, 0);
            this.pos = createVector(x, y);
            this.size = createVector(largura, altura);
            self.wall = 5;
        }

        set_pos(x, y){
            // pos: p5.Vector
            this.pos.x = x;
            this.pos.y = y;
        }

        add_adjacente(obj){
            if(self.adjacentes.length < 4){
                self.adjacentes.append(obj);
            }
        }

        print(){
            console.log(this.name + " name / size " + self.size);
        }

        draw_absoluto(){
            console.log(this.name + ": " + this.pos.x +","+this.pos.y);
            //this.visitado = 1;

            fill(25)
            rect(this.pos.x, this.pos.y, self.largura, this.altura);

            fill(this.color);
            rect(this.pos.x + self.wall, this.pos.y + self.wall, 
                 this.largura - 2*self.wall, this.altura - 2*self.wall);

            fill(0);
            textSize(20);
            text(this.name, this.pos.x + 10, this.pos.y + 25);
            this.draw_adjacentes();
        }

        // draw na posição onde está
        draw(){
            //console.log(this.name + ": " + this.pos.x +","+this.pos.y);
            //this.visitado = 1;
            stroke(25);
            fill(25)
            rect(0, 0, self.largura, this.altura);

            fill(this.color);
            rect(self.wall, self.wall, this.largura - 2*self.wall, this.altura - 2*self.wall);

            noStroke();
            fill(0);
            textSize(20);
            text(this.name, 10, 25);

            // to visit all the adjacentes of the adjacentes of the adjacentes etc
            //this.draw_adjacentes();
        }

        draw_adjacentes(){
            this.adjacentes.forEach( (item, index, array) => {
                if(item.name != undefined && !item.visitado){
                    // fazer tudo abaixo relativo, com um translate, sem precisar alterar os objetos
                    var pos = createVector(0, 0);
                    switch(index){
                        case 0:
                            pos.y = - item.altura;
                            break;
                        case 1:
                            pos.x = this.largura;
                            break;
                        case 2:
                            pos.y = this.altura;
                            break;
                        case 3:
                            pos.x = - item.largura;
                            break;
                        default:
                            break;
                    };
                    push()
                    translate(this.pos.x + pos.x, this.pos.y + pos.y);
                    item.draw();
                    item.visitado = 0;
                    pop();
                }

                if(item.name != undefined && item.visitado){
                    console.log(item.name + " ja visitado");
                }
            });
        }

        isinside(obj){
            if( obj.pos.x > 0 &&
                obj.pos.x < this.largura &&
                obj.pos.y > 0 &&
                obj.pos.y < this.altura ){
                return true;
            } else {
                return false;
            }
        }

        // modo linkando os objetos, posicionamento não absoluto
        isOut(vetor){
            if( vetor.y < this.pos.y){
                // saindo pelo topo
                return 1;
            } else
            if( vetor.x > this.pos.x + this.largura){
                // saindo pela direita
                return 2;
            } else
            if( vetor.y > this.pos.y + this.altura){
                return 3;
            } else
            if( vetor.x < this.pos.x){
                // saindo pela esquerda
                return 4;
            } else {
                // o objeto está dentro deste Room
                return 0;
            }
        }

        // modo linkando os objetos, com posição inicial = 0
        isOut1(vetor){
            if( vetor.y < 0){
                // saindo pelo topo
                return 1;
            } else
            if( vetor.x > this.largura){
                // saindo pela direita
                return 2;
            } else
            if( vetor.y > this.altura){
                return 3;
            } else
            if( vetor.x < 0 ){
                // saindo pela esquerda
                return 4;
            } else {
                // o objeto está dentro deste Room
                return 0;
            }
        }

        isinside1(obj){
            if( obj.pos.x > this.pos.x &&
                obj.pos.x < (this.pos.x + self.largura) &&
                obj.pos.y > this.pos.y &&
                obj.pos.y < (this.pos.y + this.altura) ){
                return true;
            } else {
                return false;
            }
        }
    }