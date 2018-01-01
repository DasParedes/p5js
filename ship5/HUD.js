var w = document.getElementById("window");
var p = document.createElement("p");

p.text = "hello";
w.append(p);

// definição da classe hud, que contêm e controla toda a interface
class HUD {
    construct() {
        this.tste = "teste";
        this.lista = ["teste"];
        this.window = document.getElementById("window");
        this.algo;
        this.abas = [];
    }

    addAba(aba) {
        //this.abas.push(aba);
    }
    
    display(){
        /*this.abas.forEach( function(a){
            a.display();
            this.window.appendChild(a.node);
        });*/
    }
}

// definição da classe aba, que controla cada grupo de botôes e informações na tela
class Aba {
    constructor() {
        this.lista = [];
        this.node = document.createElement("div");
        // this.node.value("Aba");
    }

    addObj(obj) {
        this.lista.push(obj);
    }

    display() {
        this.lista.forEach( function(b){
            this.lista.appendChild(b);
        });
        /*
        rect(0, 0, 200, 200);
        this.lista.forEach(function (obj) {
            obj.display();
        });*/
    }

    isInside() {
        var reference;
        this.lista.forEach(function (current, index, array, thisArg) {
            console.log(mouseX + " " + mouseY);
            if (current.x + current.width > mouseX &&
                    current.x < mouseX &&
                    current.y + current.height > mouseY &&
                    current.y < mouseY) {
                reference = array[index];
            }
        });
        return reference;
    }
}
// definição da classe botão, que define o tamanho, desenho e action de cada botão
class Button {
    constructor(x, y, width, height) {
        this.node = document.createElement("button");
        //this.node.value("btn");
        
        // posição (x,y)
        this.x = x;
        this.y = y;
        // tamanho largura, altura
        this.width = width;
        this.height = height;

        // cores RGB do botão
        this.r = 100;
        this.g = 100;
        this.b = 100;

        // antigo opção para arrastar o botão livremente
        // this.dragged = true;
    }

    // exibe o botão a partir da coordenada 0, 0
    display() {
        // cores do botão
        fill(this.r, this.g, this.b);
        // tamanho
        rect(this.x, this.y, this.width, this.height);
    }

    // function, action of the button
    action() {
        // nothing
    }
}

// inicialização da interface de usuário e dos HUDS, abas e botões
var hud = new HUD();

var principal = new Aba();

var btn_iniciar = new Button(0,0,100, 100);
btn_iniciar.r = 50;
btn_iniciar.g = 250;
btn_iniciar.b = 250;

hud.addAba(principal);
principal.addObj(btn_iniciar);

hud.display();

console.log(hud);