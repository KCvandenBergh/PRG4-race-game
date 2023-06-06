import { Actor, Vector, Input } from 'excalibur';
import { Resources } from './resources.js';

export class StartScreen {
  constructor(game) {
    this.game = game;
  }

  show() {
    const background = new Actor({
      width: this.game.engine.canvasWidth,
      height: this.game.engine.canvasHeight
    });
    background.graphics.use(Resources.Achtergrond.toSprite());
    const scaleRatioX = this.game.engine.canvasWidth / background.width;
    const scaleRatioY = this.game.engine.canvasHeight / background.height;
    background.scale.setTo(scaleRatioX, scaleRatioY);
    this.game.engine.add(background);

    const startText = new Actor({
      pos: new Vector(this.game.engine.canvasWidth / 2, this.game.engine.canvasHeight / 2),
      anchor: new Vector(0.5, 0.5),
      width: 400,
      height: 200
    });
    startText.graphics.text('Druk op spatie om te starten', '48px sans-serif', 'white');
    this.game.engine.add(startText);

    this.game.engine.input.keyboard.on('press', (evt) => {
      if (evt.key === Input.Keys.Space) {
        this.game.showGameScreen();
      }
    });
  }
}

