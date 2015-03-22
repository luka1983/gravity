define([], 
function () {
	return {
		name: '',
		parts: [],
		position: { x: 0, y: 0, vx: 0, vy: 0, angle: 0, vangle: 0 },
		thrust: false,
		move: function (x, y, angle) {
			this.position.x = x;
			this.position.y = y;
			this.position.angle = angle;
		},
		move_rel: function (dx, dy) {
			this.position.x += dx;
			this.position.y += dy;
		},
		rotate_rel: function () {
			this.position.angle += this.position.vangle;
		},
		print_name: function () {
			console.log(this.name);
		},
		draw: function (ctx) {
			ctx.save();
			ctx.beginPath();

			ctx.strokeStyle = "#74d050";
			ctx.lineWidth = 3;
			ctx.translate(40 + this.position.x, 75 + this.position.y);
			ctx.rotate(this.position.angle * Math.PI / 180);
			ctx.translate(-40 - this.position.x, -75 - this.position.y);
			//ctx.translate(150, 150);

			// cabin
			ctx.moveTo(20 + this.position.x, 60 + this.position.y);
			ctx.lineTo(0 + this.position.x, 40 + this.position.y);
			ctx.lineTo(0 + this.position.x, 20 + this.position.y);
			ctx.lineTo(20 + this.position.x, 0 + this.position.y);
			ctx.lineTo(60 + this.position.x, 0 + this.position.y);
			ctx.lineTo(80 + this.position.x, 20 + this.position.y);
			ctx.lineTo(80 + this.position.x, 40 + this.position.y);
			ctx.lineTo(60 + this.position.x, 60 + this.position.y);
	
			// fuel tank
			ctx.moveTo(0 + this.position.x, 60 + this.position.y);
			ctx.lineTo(80 + this.position.x, 60 + this.position.y);
			ctx.lineTo(80 + this.position.x, 90 + this.position.y);
			ctx.lineTo(0 + this.position.x, 90 + this.position.y);
			ctx.closePath()

			// left leg
			ctx.moveTo(0 + this.position.x, 75 + this.position.y);
			ctx.lineTo(-15 + this.position.x, 105 + this.position.y);
			ctx.lineTo(-15 + this.position.x, 120 + this.position.y);
			ctx.moveTo(-25 + this.position.x, 120 + this.position.y);
			ctx.lineTo(-5 + this.position.x, 120 + this.position.y);
			ctx.moveTo(-15 + this.position.x, 105 + this.position.y);
			ctx.lineTo(10 + this.position.x, 90 + this.position.y);

			// right leg
			ctx.moveTo(80 + this.position.x, 75 + this.position.y);
			ctx.lineTo(95 + this.position.x, 105 + this.position.y);
			ctx.lineTo(95 + this.position.x, 120 + this.position.y);
			ctx.moveTo(105 + this.position.x, 120 + this.position.y);
			ctx.lineTo(85 + this.position.x, 120 + this.position.y);
			ctx.moveTo(95 + this.position.x, 105 + this.position.y);
			ctx.lineTo(70 + this.position.x, 90 + this.position.y);

			// motor
			ctx.moveTo(45 + this.position.x, 90 + this.position.y);
			ctx.lineTo(55 + this.position.x, 110 + this.position.y);
			ctx.lineTo(25 + this.position.x, 110 + this.position.y);
			ctx.lineTo(35 + this.position.x, 90 + this.position.y);

			// draw thrust plume if thrust on
			if (this.thrust) {
				ctx.moveTo(53 + this.position.x, 115 + this.position.y);
				ctx.lineTo(40 + this.position.x, 135 + this.position.y);
				ctx.lineTo(27 + this.position.x, 115 + this.position.y);
				ctx.closePath()
			}

			ctx.stroke();
			ctx.restore();
		}
	}
});