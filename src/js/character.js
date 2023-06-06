import { Actor, Engine, Vector, Physics, CollisionType, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Human } from "./human.js";

export class Character extends Human {

    constructor() {
        super();
        this.pos = new Vector(800, 300);
        this.graphics.use(Resources.Character.toSprite());

        //this.vel = new Vector(-10, 0);
        this.jumpHeight = 5; // Hoogte van de sprong
        this.jumpSpeed = 1700; // Snelheid van de sprong
        this.grounded = true; // Grondstatus van het personage
        this.body.collisionType = CollisionType.Active

        this.body.useGravity = true
    }

    onPreUpdate(engine) {
        if (!this.grounded) {
            // Beweeg naar links met de linkerpijl
            if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
                this.pos.x -= 5; // Pas de bewegingssnelheid aan naar wens
            }
            // Beweeg naar rechts met de rechterpijl
            if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
                this.pos.x += 5; // Pas de bewegingssnelheid aan naar wens
            }
        }
    }
}
