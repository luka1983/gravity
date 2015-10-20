requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app',
		jquery: 'jquery'
	}
});

// Start the main app logic.
requirejs(['jquery', 'app/game'],
function ($, game) {
	var load_handler = function() {
		console.log('loaded handler called');
		game.start();
	}
	game.load(load_handler);
});
