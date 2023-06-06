import { Actor, Engine, Vector, Physics, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Spacegun } from './spacegun';


export class Goldplatform extends Actor {

    constructor() {
        super({ width: 300, height: 70 })
        this.body.collisionType = CollisionType.Fixed
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Goudenpatform.toSprite());

        // composition  
        let spacegun = new Spacegun()
        this.addChild(spacegun)

        // this.body.collider.type = 'fixed'; // Zorg ervoor dat het platform geen invloed heeft op de beweging van het personage
    }

    resetPosition() {
        this.pos = new Vector(500, 100)
    }
}