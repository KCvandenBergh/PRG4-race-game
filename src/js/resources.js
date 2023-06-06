import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import characterImage from '../images/yuki.png'
import background from '../images/background.png'
import platform from '../images/platform1.png'
import spacegun from '../images/gun.png'
import  enemy from '../images/spacemonster1.png'
import goldplatform from '../images/platform2.png'

const Resources = {
    Character: new ImageSource(characterImage),
    Achtergrond: new ImageSource(background),
    Platform: new ImageSource(platform),
    Pistool: new ImageSource(spacegun),
    Vijand: new ImageSource (enemy),
    Goudenpatform: new ImageSource (goldplatform),


}
const ResourceLoader = new Loader([Resources.Character, Resources.Achtergrond, Resources.Platform, Resources.Pistool, Resources.Vijand, Resources.Goudenpatform])

export { Resources, ResourceLoader }

// const background = new Actor()
// background.graphics.use(Resources.background.toSprite())
// this.add(background)