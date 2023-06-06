import '../css/style.css'
import { Actor, Engine, Vector, Input, Physics, CollisionType, Label, FontUnit, Font, Color } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Platform } from './platform';
import { Spacegun } from './spacegun';
import { Character } from './character';
import { Enemy } from './enemy';
import { Goldplatform } from './goldplatform';

export class Game extends Engine {
    score = 0;
    constructor() {
        super({ width: 1550, height: 715 });
        Physics.useArcadePhysics()
        Physics.gravity = new Vector(0, 800)
        this.showDebug(true)
        this.backgroundColor = "transparent"; // Achtergrondkleur van het canvas
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");

        // character ophalen vanuit de resources
        const character = new Character();


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

        // Scorelabel aanmaken
        // const scoreLabel = new Label(`Score: ${this.score}`);
        // scoreLabel.pos = new Vector(100, 100);
        // this.add(scoreLabel);

        const scoreLabel = new Label({
            text: (`Score: ${this.score}`),
            pos: new Vector(1200, 100),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px,
                color: 'white'

            })
        });
        this.add(scoreLabel);


        // Platform waar Yuki niet op mag springen omdat er een enemy op staat
        const platform = new Platform();
        this.add(platform);
        platform.pos = new Vector(20, 300);


        const platformTwo = new Platform();
        this.add(platformTwo);
        platformTwo.pos = new Vector(200, 600);

        // Gouden platform waar de spaceguns op staan
        const goldplatform = new Goldplatform();
        this.add(goldplatform);
        goldplatform.pos = new Vector(1100, 500);

        //Gun in canvas
        const spacegun = new Spacegun();
        this.add(spacegun);
        spacegun.pos = new Vector(100, 200);

        //Enemy in canvas
        const enemy = new Enemy();
        this.add(enemy);
        enemy.pos = new Vector(50, 100);


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

        // Detecteer botsing tussen personage en spacegun
        character.on('collisionstart', (evt) => {
            if (evt.other instanceof Spacegun) {
                spacegun.kill();
                console.log("verwijderd");
                // increaseScore(); // Verhoog de score
                this.score++
                scoreLabel.text = `Score: ${this.score}`; // Scorelabel bijwerken
            }
        });


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

