function create_GUI(){
  var hud = new HUD();
  
  var menu_edit = document.getElementById("menu_edit_ship");
  //var parts_menu = menu_edit.getElementById('parts');
  var parts = [
    ['strong engine', Main_Engine.display],
    ['control engine', Control_Engine.display ]
  ];

  //var node = document.createElement('li');
  
  //parts_menu.appendChild('');
  return hud;
}

