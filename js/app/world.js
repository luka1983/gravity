define(['jquery', './object'], 
function ($, object) {
	function populate(num) {
		var objects = [];
		for (var i = 0; i < num; ++i) {
			var obj = Object.create(object);
			objects.push(obj);
		}
		for (var i in objects) {
			objects[i].name = 'object' + i;
			objects[i].position = { x: $(window).width() / 2, y: $(window).height() / 2, vx: 0, vy: 0, angle: 0, vangle: 0 };
			objects[i].mass = 500;
			objects[i].thrust_force = 20000;
			objects[i].fuel = 100;
			objects[i].isp = 400;
			//objects[i].move(Math.random() * 1200, Math.random() * 800);
		}

		return objects;
	}
	function draw() {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );

		// draw overlay
		ctx.font="bold 20px Courier New";
		ctx.fillStyle = "#74d050";
		ctx.fillText('x: ' + Math.round(this.objects[0].position.x) + '', 10, 15);
		ctx.fillText('y: ' + Math.round(this.objects[0].position.y) + '', 10, 30);

		// draw game objects
		for (var i in this.objects)
			this.objects[i].draw(ctx);

	}
	function step() {
		for (var i = 0, length = this.objects.length; i < length; ++i) {
			var obj = this.objects[i];
			var a = Math.exp(-this.density * 0.04 / obj.mass);
			var f = (obj.thrust) ? obj.thrust_force : 0;
			obj.position.vx = a * obj.position.vx + f * Math.cos((90 - obj.position.angle) * Math.PI / 180) * (1 - a) / this.density;
			obj.position.vy = a * obj.position.vy + (f * Math.sin((90 - obj.position.angle) * Math.PI / 180) - obj.mass * 9.81) * (1 - a) / this.density;
			obj.position.x += obj.position.vx * 0.04;
			obj.position.y -= obj.position.vy * 0.04;

			console.log('object: ' + obj.name + ', position (x,y): (' + obj.position.x + ',' + obj.position.y + ')');
		}
	}
	return {
		density: 10,
		background: { name: 'background_name' },
		terrain: { name: 'terrain_name' },
		step: step,
		draw: draw,
		objects: populate(1)
	}
});
