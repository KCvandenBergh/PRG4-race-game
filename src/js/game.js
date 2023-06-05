import '../css/style.css'
import { Actor, Engine, Vector, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Platform } from './platform';

export class Game extends Engine {
    constructor() {
        super({ width: 1550, height: 715 });
        this.backgroundColor = "transparent"; // Achtergrondkleur van het canvas
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");

        // character ophalen vanuit de resources
        const character = new Actor();
        character.graphics.use(Resources.Character.toSprite());
        character.pos = new Vector(400, 300);
        character.vel = new Vector(-10, 0);
        character.jumpHeight = 5; // Hoogte van de sprong
        character.jumpSpeed = 1700; // Snelheid van de sprong
        character.grounded = true; // Grondstatus van het personage


        // Achtergrondafbeelding toevoegen
        const background = new Actor({
            width: this.canvasWidth,
            height: this.canvasHeight

        });
        background.graphics.use(Resources.Achtergrond.toSprite());

        // Schaal de achtergrondafbeelding om het gehele canvas te bedekken
        const scaleRatioX = this.canvasWidth / background.width;
        const scaleRatioY = this.canvasHeight / background.height;
        background.scale.setTo(scaleRatioX, scaleRatioY);

        this.add(background);


        // Platform voor Yuki om op te springen
        const platform = new Platform();
        this.add(platform);
        platform.pos = new Vector(600, 500);


        const platformTwo = new Platform();
        this.add(platformTwo);
        platform.pos = new Vector(200, 100);


        // Springen wanneer de spatiebalk wordt ingedrukt
        this.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                character.vel = character.vel.addEqual(new Vector(0, -character.jumpSpeed));
                character.grounded = false;
            }
        });


        // Zwaartekracht en grondcontrole
        this.onPostUpdate = () => {
            if (!character.grounded) {
                character.vel = character.vel.addEqual(new Vector(0, 15));
            }

            // Beperk de positie van het personage binnen het canvas
            const minX = 0;
            const maxX = this.canvasWidth - character.width;
            const minY = 0;
            const maxY = this.canvasHeight - character.height;

            if (character.pos.x < minX) {
                character.pos.x = minX;
            } else if (character.pos.x > maxX) {
                character.pos.x = maxX;
            }

            if (character.pos.y < minY) {
                character.pos.y = minY;
            } else if (character.pos.y > maxY) {
                character.pos.y = maxY;
            }

            // Grondcontrole
            if (character.pos.y + character.height >= this.canvasHeight) {
                character.pos.y = this.canvasHeight - character.height;
                character.vel.y = 0;
                character.grounded = true;
            }
        };


        // Horizontale beweging met de pijltoetsen
        character.update = function (engine, delta) {
            Actor.prototype.update.call(this, engine, delta);

            if (!character.grounded) {
                // Beweeg naar links met de linkerpijl
                if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
                    character.pos.x -= 5; // Pas de bewegingssnelheid aan naar wens
                }
                // Beweeg naar rechts met de rechterpijl
                if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
                    character.pos.x += 5; // Pas de bewegingssnelheid aan naar wens
                }
            }
        };

        this.add(character); // Voeg het personage toe na de achtergrondafbeelding
    }

}


new Game();

