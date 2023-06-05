import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import characterImage from '../images/yuki.png'
import background from '../images/background.png'
import platform from '../images/platform1.png'

const Resources = {
    Character: new ImageSource(characterImage),
    Achtergrond: new ImageSource(background),
    Platform: new ImageSource(platform)


}
const ResourceLoader = new Loader([Resources.Character, Resources.Achtergrond, Resources.Platform])

export { Resources, ResourceLoader }

// const background = new Actor()
// background.graphics.use(Resources.background.toSprite())
// this.add(background)