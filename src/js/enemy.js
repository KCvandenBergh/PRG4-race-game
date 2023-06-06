import { Actor, Engine, Vector, Physics, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Human } from "./human.js";

export class Enemy extends Human {
    constructor() {
        super();
        this.scale = new Vector(0.2, 0.2)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Vijand.toSprite());
        this.pos = new Vector(50, -50); 
    }
}