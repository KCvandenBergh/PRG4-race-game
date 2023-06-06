import { Actor, Engine, Vector, Physics, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Character extends Actor {

    constructor() {
        super({ width: 100, height: 200 })
        this.pos = new Vector(800, 300);
        this.graphics.use(Resources.Character.toSprite());

        //this.vel = new Vector(-10, 0);
        this.jumpHeight = 5; // Hoogte van de sprong
        this.jumpSpeed = 1700; // Snelheid van de sprong
        this.grounded = true; // Grondstatus van het personage
        this.body.collisionType = CollisionType.Active

        this.body.useGravity = true
    }
}
