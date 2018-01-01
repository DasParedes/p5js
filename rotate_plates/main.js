var plates = [];


function setup(){
	createCanvas(400, 300);

	plates.push( new Plate(100, 100, 100, .05));

	frameRate(2);
}

function draw(){
	background(55);
	plates.forEach( (item, index, array ) => {
		item.draw();
		item.update();
	});

	console.log(keys);
}