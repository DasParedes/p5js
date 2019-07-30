function create_GUI(){
  var hud = new HUD();
  var tela_ship_edit = new Component(0, 0);
  tela_ship_edit.name = 'menu_edit';

  var menu_partes = new Component(width - 150, 100);
  menu_partes.name = 'partes';

  var ship_construction = new Component(0, 100);
  ship_construction.name = 'ship';

  hud.addAba(tela_ship_edit);

  tela_ship_edit.add(menu_partes);
  tela_ship_edit.add(ship_construction);
  
  
  configure_gui_partes(menu_partes);


  ship_construction.width = menu_partes.x - 50;
  ship_construction.height = height - 100;
  ship_construction.color = '#000';

  console.log(menu_partes);
  return hud;
}

function mousePressed(){
  if (GAME_MODE == SHIP_CONSTRUCTION){
    var target = hud.isInside();
    if (target != null){
      console.log(target);

      if(hud.target && typeof(hud.target.disAction) === 'function')
        hud.target.disAction();
      
      hud.target = target;
      hud.target.action();
      hud.mouseHover = null;
    } else {
      hud.target.disAction();
      hud.target = null;
    }
  }
}

function mouseReleased(){
  if (GAME_MODE == SHIP_CONSTRUCTION){
    var target = hud.isInside();
    if (hud.target && target == null){
      //target.disAction();
      //hud.target = null;
    }
  } 
}

function mouseMoved(){
  if (GAME_MODE == SHIP_CONSTRUCTION){
    var target = hud.isInside();

    if (target){
      if(target != hud.target){
        console.log('movendo');
	      console.log(target);
        console.log(hud.mouseHover);

        if(hud.mouseHover && typeof(hud.mouseHover.desRealce) === 'function')
          hud.mouseHover.desRealce();
        console.log('realce!!!');
        
        hud.mouseHover = target;
        hud.mouseHover.realce();
        
      }

    } else {
      if (hud.mouseHover){
        hud.mouseHover.desRealce();
        hud.mouseHover = null;
      }
    }
  } 
}

function configure_gui_partes(menu_partes){
  menu_partes.width = width - menu_partes.x;
  menu_partes.height = height - menu_partes.y;

  var parts = [
    ['control_engine', Control_Engine],
    ['strong_engine', Main_Engine],
    ['unity', Unity ]
  ];
  
  menu_partes.add( new Texto(0, 0, 'Partes'));

  var offset = 50;
  parts.forEach( (parte, index) => {
    var b_size = 50;
    var b_margin = 10;
    var b = new Button(0, offset + b_size*index + b_margin*index, b_size, b_size);
    console.log(parte);
    b.image_function = parte[1].prototype.display;
    b.function = function(){console.log('hello');};
    menu_partes.add(b);
    console.log(b);
  });
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
