function create_GUI(){
  var hud = new HUD();

  var menu_partes = new Component(width - 150, 200);
  hud.addAba(menu_partes);
  
  var parts = [
    ['strong_engine', Main_Engine],
    ['control_engine', Control_Engine],
    ['unity', Unity ]
  ];  
  
  parts.forEach( (parte, index) => {
    var b = new Button(0, 50*index + 10*index, 50, 50);
    console.log(parte);
    b.image_function = parte[1].prototype.display;
    menu_partes.add(b);
    
  });
  
  return hud;
}

function mousePressed(){
  if (GAME_MODE == SHIP_CONSTRUCTION){
    
  }
}







function GUI_with_html(){
  var menu_edit = document.getElementById("menu_edit_ship");
  var parts_menu = menu_edit.getElementsByClassName('parts')[0];

  var lista = document.createElement('ul');
  parts.forEach( (parte) => {
    console.log(parte[0]);
    var node = document.createElement('li');    
    //var textNode = document.createTextNode(parte[0]);
    var img = document.createElement('img');
    img.setAttribute('src', parte[0]+'.png');
    img.setAttribute('title', parte[0]);
    
    //node.appendChild(textNode);
    lista.setAttribute('style', 'list-style-type: none');
    
    lista.appendChild(node);
    node.appendChild(img);
    node.setAttribute('style', 'border: 1px solid black');
    node.setAttribute('style', 'width: 100px');

    
    node.onclick = function(elem){
      console.log(elem);
      hud.target = elem.target.title;
      console.log(hud.target);
    };
  });

  parts_menu.appendChild(lista);
  //parts_menu.appendChild('');
}
