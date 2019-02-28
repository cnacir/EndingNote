// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require phaser
//= require phaser.min
// require config
// require GameScene
// require BootScene
// require PreloaderScene
// require TitleScene
// require OptionsScene
// require CreditsScene
// require Model

//= require_tree .
var game = document.getElementById("game")
var head = document.querySelector("head")
function importScript() {
  var script = document.createElement('script')
	var scripts = document.scripts;
	for (var i = 0; i < scripts.length; i++) {
		script.setAttribute('src', scripts[i])
		document.body.appendChild(script)
	};
};

document.addEventListener("DOMContentLoaded", () => {
	if (!game) {
		importScript();
	};
});
