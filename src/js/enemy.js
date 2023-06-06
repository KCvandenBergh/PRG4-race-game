import { Actor, Engine, Vector, Physics, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Enemy extends Actor {
    constructor() {
        super({ width: 600, height: 600 });
        this.scale = new Vector(0.2, 0.2)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Vijand.toSprite());
        this.pos = new Vector(50, -50); 
    }
}