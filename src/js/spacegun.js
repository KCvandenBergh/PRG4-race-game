import { Actor, Engine, Vector, Physics, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Spacegun extends Actor {
    constructor() {
        super({ width: 100, height: 100 });
        // this.body.collider.type = CollisionType.PreventCollision;
        this.scale = new Vector(0.2, 0.2)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Pistool.toSprite());
        this.pos = new Vector(50, -50); // Aanpassen aan de gewenste positie van de Spacegun op het Platform
    }
}