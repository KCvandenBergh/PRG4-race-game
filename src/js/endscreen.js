import { Actor, Vector, Input, Scene } from 'excalibur';
import { Resources } from './resources.js';

export class EndScreen extends Scene {
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

        const endText = new Actor({
            pos: new Vector(this.game.engine.canvasWidth / 2, this.game.engine.canvasHeight / 2),
            anchor: new Vector(0.5, 0.5),
            width: 400,
            height: 200
        });
        endText.graphics.text('Game Over', '48px sans-serif', 'white');
        this.game.engine.add(endText);

        this.game.engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.game.showStartScreen();
            }
        });
    }
}
