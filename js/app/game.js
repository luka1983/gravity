define(['./world', 'jquery'], 
function (world) {
	return {
		state: 'initial',
		world: world,
		initialize_controls: function (that) {
			window.onkeydown = function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
					
				if (key == 37 && that.world.objects[0].position.vangle == 0) {
					that.world.objects[0].position.vangle = -5;
				}
				else if (key == 38) {
					that.world.objects[0].thrust = true;
				}
				else if (key == 39 && that.world.objects[0].position.vangle == 0) {
					that.world.objects[0].position.vangle = 5;
				}
				else if (key == 40) {
					console.log('key down pressed');
				}

				that.world.draw(that.canvas);
			}
			window.onkeyup = function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
					
				if (key == 37 && that.world.objects[0].position.vangle < 0) {
					that.world.objects[0].position.vangle = 0;
				}
				else if (key == 38) {
					that.world.objects[0].thrust = false;
				}
				else if (key == 39 && that.world.objects[0].position.vangle > 0) {
					that.world.objects[0].position.vangle = 0;
				}
				else if (key == 40) {
					console.log('key down released');
				}

				that.world.draw(that.canvas);
			}
		},
		load: function (hloaded) {
			//canvas.width  = window.innerWidth;
			//canvas.height = window.innerHeight;
			this.tick = 40;
			this.state = 'loaded';
			console.log('loaded backgrond: ' + this.world.background.name);
			console.log('loaded terrain: ' + this.world.terrain.name);
			console.log('World objects:');
			for (var i in this.world.objects)
				this.world.objects[i].print_name();
			this.initialize_controls(this);

			if (this.canvas == undefined) {
				this.canvas = $('<canvas></canvas>').width($(window).width()).height($(window).height);
				$('body').append(this.canvas);
			}

			this.ctx = this.canvas[0].getContext('2d');
			this.ctx.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );

			hloaded();
		},
		start: function () {
			setInterval(this.step, this.tick, this);
		},
		step: function (that) {
			console.log('tick');
			///$.proxy(this.world.objects[0].rotate_rel(), this);
			that.world.objects[0].rotate_rel();
			that.world.step();
			that.world.draw(that.canvas);
		}
	}
});

//var cntr = 0;
//var tnc = document.createElement('div');
//tnc.id = 'text-node-counter';
//
//var tn = document.createTextNode('');
//tn.nodeValue = cntr + 'frames';
//
//tnc.appendChild(tn);
//document.body.appendChild(tnc);
//
//function simulation () {
//	cntr++;
//	tn.nodeValue = cntr + ' frames';
//}
//
//function create_world() {
//	return { backgrond: {}, terrain: {}, objects: {} };
//}
//
//(function main () {
//	var tick = 40;
//
//	// create world
//	var world = create_world();
//
//	// initialize controls
//
//	// start simulation
//	setInterval(simulation, tick);
//})();