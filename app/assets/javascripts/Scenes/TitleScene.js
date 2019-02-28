class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
		// Game name
		this.endingNote = this.add.text(config.width/2.5 - 70, 50, 'ENDING NOTE ', {font: '90px VT323', stroke: 'navy', strokeThickness: 8, fill: 'white'});

    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      // this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    };
		if (this.model.soundOn === true && this.model.soundPlaying === false) {
			this.soundFx = this.sound.add('soundFx', {volume: 0.5});
			this.model.soundPlaying = true;
			this.sys.game.globals.soundFx = this.soundFx;
		};
  };

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};
