var score;
var var_pop_time;
var gameLoop;
var velocity_all_ball;
var highscore;
var random_number;
var music_note;
var strikes;
var enter;

class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  };

  preload () {
    // Load assets
    // this.load.image('logo', 'assets/logo.png');
		this.load.image('bg', 'assets/FretBoard.png')
		this.load.image('green_note', 'assets/green-note.png')
		this.load.image('red_note', 'assets/red-note.png')
		this.load.image('yellow_note', 'assets/yellow-note.png')
		this.load.image('blue_note', 'assets/blue-note.png')
		this.load.image('orange_note', 'assets/orange-note.png')

		this.load.audio('note1', 'assets/Vocal 011.mp3');
		this.load.audio('note2', 'assets/Vocal 012.mp3');
		this.load.audio('note3', 'assets/Vocal 013.mp3');
		this.load.audio('note4', 'assets/Vocal 014.mp3');
		this.load.audio('note5', 'assets/Vocal 015.mp3');
		this.load.audio('note6', 'assets/Vocal 016.mp3');
		this.load.audio('note7', 'assets/Vocal 017.mp3');
		this.load.audio('note8', 'assets/Vocal 018.mp3');
		this.load.audio('note9', 'assets/Vocal 019.mp3');
		this.load.audio('note10', 'assets/Vocal 020.mp3');
		this.load.audio('note11', 'assets/Vocal 021.mp3');
		this.load.audio('immigrant-song', 'assets/Immigrant Song (Remastered).mp3')
  };

  create () {

    // this.add.image(config.width/2, config.height/2, 'logo');
		var bg = this.add.sprite(config.width/3, config.height/2, 'bg')
		bg.setScale(0.58);

		// Play track on game load
		this.immigrantSong = this.sound.add('immigrant-song');
		this.time.addEvent({
				delay: 300,
				callback: function () {
					this.immigrantSong.play()
				},
				callbackScope: this
		});

		strikes = 0
		highscore = 0;
		score = 0;
		music_note = 0;

		// Set up the spawning time at 800ms
		var_pop_time = 800;

		// Set up velocity on y axis
		velocity_all_ball = 200;

		// Set greeting message with instructions to start
		this.startText = this.add.text(25, 600, 'Press <SPACE> to play !', {font: '50px Arial',fill: 'white'});

		// Set Game Over message
		this.gameOverText = this.add.text(config.width/3 - 50, 350, 'GAME OVER ', {font: '90px Arial',fill: 'white'});
		this.gameOverText.visible = false;

		// Create custom styled '<ENTER>' message
		enter = this.add.text(config.width/3 + 80, config.height/3 - 95, '<ENTER>', {font: '50px Arial', fill: 'purple'});

		// Create prompt to restart
		this.restartText = this.add.text(config.width/3 - 140, config.height/3 - 100, `     Press                   to restart !`, {font: '50px Arial',fill: 'white'});
		this.restartText.visible = false;
		enter.visible = false;

		// Setting up A,S,D,F,G key for AZERTY and QWERTY user
		this.green_button = this.input.keyboard.on('keydown_A', function () {
			this.addScoreGreen();
		}, this)

		this.red_button = this.input.keyboard.on('keydown_S', function () {
			this.addScoreRed();
		}, this)

		this.yellow_botton = this.input.keyboard.on('keydown_D', function () {
			this.addScoreYellow();
		}, this)

		this.blue_button = this.input.keyboard.on('keydown_F', function () {
			this.addScoreBlue();
		}, this)

		this.orange_button = this.input.keyboard.on('keydown_G', function () {
			this.addScoreOrange();
		}, this)

		// Add notes to the game within groups

		this.green_note_group = this.physics.add.group();
		this.red_note_group = this.physics.add.group();
		this.yellow_note_group = this.physics.add.group();
		this.blue_note_group = this.physics.add.group();
		this.orange_note_group = this.physics.add.group()

		this.scoreText = this.add.text(10, 25 , 'Score : ' +	score, {font: '20px Arial', fill: 'white'});

		this.highScoreText = this.add.text(160, 25, 'Highscore : ' + highscore, {font: '20px Arial', fill: 'white'});

		this.strikeText = this.add.text(360, 25, 'Strikes : ' + strikes, {font: '20px Arial', fill: 'white'})

		this.niceText = this.add.text(230, 100, 'NICE !', {font: '50px Arial', fill: '#00FF21'});
		this.niceText.visible = false;

		this.logo = this.add.sprite(25,10, 'logo');
		this.logo.setScale(0.30,0.30);


		var gameLoop = this.time.addEvent({
				delay: var_pop_time,
				callback: this.crea_number_rand,
				callbackScope: this,
				loop: true,
		});

		// Gameover if strikes are over 10
		var game_over = this.time.addEvent({
				delay: 500,
				callback: this.gameOver,
				callbackScope: this,
				loop: true,
		});

		// When enter is pressed, restart the game
		this.restart_game_key = this.input.keyboard.on('keydown_ENTER', function () {
			this.gameRestart();
		}, this);

		// Stop all sound for the restart
		// this.sound.stopAll();

		// Audio added
		this.note11 = this.sound.add('note1', {volume: 0.5});
		this.note12 = this.sound.add('note2', {volume: 0.5});
		this.note13 = this.sound.add('note3', {volume: 0.5});
		this.note14 = this.sound.add('note4', {volume: 0.5});
		this.note15 = this.sound.add('note5', {volume: 0.5});
		this.note16 = this.sound.add('note6', {volume: 0.5});
		this.note17 = this.sound.add('note7', {volume: 0.5});
		this.note18 = this.sound.add('note8', {volume: 0.5});
		this.note19 = this.sound.add('note9', {volume: 0.5});
		this.note20 = this.sound.add('note10', {volume: 0.5});
		this.note21 = this.sound.add('note11', {volume: 0.5});

	};

	update() {

	// Check if blue_note_group.child exists
	Phaser.Actions.Call(this.blue_note_group.getChildren(), function(blue) {
		if (this.blue_note_group.length === 0)  {
			// Do nothing
		};
		// Check if blue note is out of bounds on lower edge of screen
		if (blue.y > 820) {
 		 blue.destroy();
		 // Increment strikes for missing a note
		 strikes +=1;
		 this.strikeText.setText('Strikes :' + strikes)
	 	};

 	}, this);

 	Phaser.Actions.Call(this.green_note_group.getChildren(), function(green) {
		if (this.green_note_group.length === 0){
			//	Do nothing
		};
		if (green.y > 820) {
			green.destroy();
			strikes +=1;
			this.strikeText.setText('Strikes :' + strikes)
		};

	}, this)

	Phaser.Actions.Call(this.red_note_group.getChildren(), function(red) {
		if (this.red_note_group.length === 0){
			//	Do nothing
		};
		if (red.y > 820) {
			red.destroy();
			strikes +=1;
			this.strikeText.setText('Strikes :' + strikes)
		};

	}, this)

	Phaser.Actions.Call(this.yellow_note_group.getChildren(), function(yellow) {
		if (this.yellow_note_group.length === 0){
			//	Do nothing
		};
		if (yellow.y > 820) {
			yellow.destroy();
			strikes +=1;
			this.strikeText.setText('Strikes :' + strikes)
		};

	}, this)

	Phaser.Actions.Call(this.orange_note_group.getChildren(), function(orange) {
		if (this.orange_note_group.length === 0){
			//	Do nothing
		};
		if (orange.y > 820) {
			orange.destroy();
			strikes +=1;
			this.strikeText.setText('Strikes :' + strikes)
		};

	}, this)

	// Store Highscore in localstorage
	this.highScoreText.text = 'Highscore : ' + localStorage.getItem("highscore");
	if (score >= localStorage.getItem("highscore")) {
		localStorage.setItem("highscore", score);
  }
};


	crea_number_rand() {
		random_number = Phaser.Math.Between(1, 5);
		if (random_number == 1) {
			this.crea_sprite_blue();
		}
		else if (random_number == 2) {
			this.crea_sprite_green();
		}
		else if (random_number == 3) {
			this.crea_sprite_red();
		}
		else if (random_number == 4) {
			this.crea_sprite_yellow();
		}
		else if (random_number == 5) {
			this.crea_sprite_orange();
		}
	};


	crea_sprite_blue() {
		 // Create sprite named "blue" at (x,y)
		this.blue_note_rand = this.blue_note_group.create(615, 50, 'blue_note');
		this.blue_note_rand.setScale(0.5)
		// Setting up drop velocity via velocity_all_ball
		this.blue_note_rand.setVelocityY(velocity_all_ball);
	};

	crea_sprite_green() {
		this.green_note_rand = this.green_note_group.create(390, 50, 'green_note');
		this.green_note_rand.setScale(0.5)
		this.green_note_rand.setVelocityY(velocity_all_ball);
	};

	crea_sprite_red() {
		this.red_note_rand = this.red_note_group.create(465, 50, 'red_note');
		this.red_note_rand.setScale(0.5)
		this.red_note_rand.setVelocityY(velocity_all_ball);
	};

	crea_sprite_yellow() {
		this.yellow_note_rand = this.yellow_note_group.create(540, 50, 'yellow_note');
		this.yellow_note_rand.setScale(0.5)
		this.yellow_note_rand.setVelocityY(velocity_all_ball);
	};

	crea_sprite_orange() {
		this.orange_note_rand = this.orange_note_group.create(693, 50, 'orange_note');
		this.orange_note_rand.setScale(0.5)
		this.orange_note_rand.setVelocityY(velocity_all_ball);
	};

	addScoreBlue() {
		Phaser.Actions.Call(this.blue_note_group.getChildren(), function(blue) {
			// Check if there any children
			if (this.blue_note_group.length === 0) {
				//	Nothing
			} else {
				// Check coordinates of the first child to increase the score
				if (blue.y > 600 && blue.y < 820) {
					// Increase score
					score +=1;
					// Kill child
					blue.destroy();
					// Update score text
					this.scoreText.setText('Score :' + score);
					// Define a new var_pop_time value (increasing the difficulty)
					var_pop_time -=50;
					// Increase the velocity of each note (increasing the difficulty)
					velocity_all_ball +=20;
					// Counter determining which note played
					music_note +=1;
					// Call the game_music function
					// this.game_music();
				};
				// If note is hit close to the bar --> +5 point
				if (blue.y >= 750 && blue.y < 820) {
					score +=5;
					blue.destroy();
					this.scoreText.setText('Score :' + score);
					this.time.addEvent({
							delay: 0,
							callback: this.showNiceText,
							callbackScope: this
					});
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (blue.y < 600) {
					score -=1;
					this.scoreText.setText('Score :' + score);
					strikes +=1;
					this.strikeText.setText('Strikes :' + strikes)
				};
			};
		}, this)
	};

	addScoreGreen() {
		Phaser.Actions.Call(this.green_note_group.getChildren(), function(green) {
			if (this.green_note_group.length === 0) {
				//	Nothing
			} else {
				if (green.y > 600 && green.y < 820) {
					score +=1;
					green.destroy();
					this.scoreText.setText('Score :' + score);
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (green.y >= 750 && green.y < 820) {
					score+=5;
					green.destroy();
					this.scoreText.setText('Score :' + score);
					this.time.addEvent({
							delay: 0,
							callback: this.showNiceText,
							callbackScope: this
					});
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (green.y < 600) {
					score -=1;
					this.scoreText.setText('Score :' + score);
					strikes +=1;
					this.strikeText.setText('Strikes :' + strikes)
				};
			};
		}, this)
	};

	addScoreRed() {
		Phaser.Actions.Call(this.red_note_group.getChildren(), function(red) {
			if (this.red_note_group.length === 0) {
				//	Nothing
			} else {
				if (red.y > 600 && red.y < 820) {
					score+=1;
					red.destroy();
					this.scoreText.setText('Score :' + score);
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (red.y >= 750 && red.y < 820) {
					score+=5;
					red.destroy();
					this.scoreText.setText('Score :' + score);
					this.time.addEvent({
							delay: 0,
							callback: this.showNiceText,
							callbackScope: this
					});
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (red.y < 600) {
					score -=1;
					this.scoreText.setText('Score :' + score);
					strikes +=1;
					this.strikeText.setText('Strikes :' + strikes)
				};
			};
		}, this)
	};

	addScoreYellow() {
		Phaser.Actions.Call(this.yellow_note_group.getChildren(), function(yellow) {
			if (this.yellow_note_group.length === 0) {
				//	Nothing
			} else {
				if (yellow.y > 600 && yellow.y < 820) {
					score+=1;
					yellow.destroy();
					this.scoreText.setText('Score :' + score);
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (yellow.y >= 750 && yellow.y < 820) {
					score+=5;
					yellow.destroy();
					this.scoreText.setText('Score :' + score);
					this.time.addEvent({
							delay: 0,
							callback: this.showNiceText,
							callbackScope: this
					});
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (yellow.y < 600) {
					score -=1;
					this.scoreText.setText('Score :' + score);
					strikes +=1;
					this.strikeText.setText('Strikes :' + strikes)
				};
			};
		}, this)
	};

	addScoreOrange() {
		Phaser.Actions.Call(this.orange_note_group.getChildren(), function(orange) {
			if (this.orange_note_group.length === 0) {
				//	Nothing
			} else {
				if (orange.y > 600 && orange.y < 820) {
					score+=1;
					orange.destroy();
					this.scoreText.setText('Score :' + score);
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (orange.y >= 750 && orange.y < 820) {
					score+=5;
					orange.destroy();
					this.scoreText.setText('Score :' + score);
					this.time.addEvent({
							delay: 0,
							callback: this.showNiceText,
							callbackScope: this
					});
					var_pop_time -=50;
					velocity_all_ball +=20;
					music_note +=1;
					// this.game_music();
				};
				if (orange.y < 600) {
					score -=1;
					this.scoreText.setText('Score :' + score);
					strikes +=1;
					this.strikeText.setText('Strikes :' + strikes)
				};
			};
		}, this)
	};


game_music() {
	if (music_note == 1){this.note11.play();}
	if (music_note == 2){this.note12.play();}
	if (music_note == 3){this.note13.play();}
	if (music_note == 4){this.note14.play();}
	if (music_note == 5){this.note12.play();}
	if (music_note == 6){this.note15.play();}
	if (music_note == 7){this.note11.play();}
	if (music_note == 8){this.note12.play();}
	if (music_note == 9){this.note13.play();}
	if (music_note == 10){this.note14.play();}
	if (music_note == 11){this.note12.play();}
	if (music_note == 12){this.note15.play();}
	if (music_note == 13){this.note11.play();}
	if (music_note == 14){this.note12.play();}
	if (music_note == 15){this.note13.play();}
	if (music_note == 16){this.note14.play();}
	if (music_note == 17){this.note12.play();}
	if (music_note == 18){this.note15.play();}
	if (music_note == 19){this.note19.play();}
	if (music_note == 20){this.note12.play();}
	if (music_note == 21){this.note13.play();}
	if (music_note == 22){this.note14.play();}
	if (music_note == 23){this.note12.play();}
	if (music_note == 24){this.note16.play();}
	if (music_note == 25){this.note19.play();}
	if (music_note == 26){this.note16.play();}
	if (music_note == 27){this.note19.play();}
	if (music_note == 28){this.note16.play();}
	if (music_note == 29){this.note14.play();}
	if (music_note == 30){this.note12.play();}
	if (music_note == 31){this.note13.play();}
	if (music_note == 32){this.note14.play();}
	if (music_note == 33){this.note16.play();}
	if (music_note == 34){this.note15.play();}
	if (music_note == 35){this.note11.play();}
	if (music_note == 36){this.note17.play();}
	if (music_note == 25){this.note18.play();}
	if (music_note == 25){this.note19.play();}
	if (music_note == 25){this.note12.play();}
	if (music_note == 25){this.note13.play();}
	if (music_note == 25){this.note14.play();}
	if (music_note == 25){this.note12.play();}
	if (music_note == 25){this.note16.play();}
};


showNiceText() {
	this.niceText.visible = true;
	this.time.delayedCall(600, function() {
    this.niceText.visible = false;
  }, [], this);
};


// Function to restart the game.
gameRestart() {
	if (this.restart_game_key) {
		this.scene.restart();
	}
};

// Set Game Over actions
gameOver() {
	if (strikes >= 10) {
		this.gameOverText.visible = true;
		this.restartText.visible = true;
		enter.visible = true;
		this.immigrantSong.stop();
		this.time.delayedCall(3000, function() {
	    this.scene.start('Title');
	  }, [], this);
	};
};

	// Render debug info
	render() {
	}
};
