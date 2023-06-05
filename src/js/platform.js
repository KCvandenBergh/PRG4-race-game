import { Actor, Engine, Vector, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';


export class Platform extends Actor {

    onInitialize(engine) {
        this.graphics.use(Resources.Platform.toSprite());

        this.body.collider.type = 'fixed'; // Zorg ervoor dat het platform geen invloed heeft op de beweging van het personage
    }

    resetPosition() {
        this.pos = new Vector(500, 100)
    }
}