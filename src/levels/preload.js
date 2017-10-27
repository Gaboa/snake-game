import { Level } from '../core'
import { Sprite } from 'pixi.js'

const loadArray = [
    { name: 'girl', url: 'img/girl.jpg' }
]

export default class Preload extends Level {

    constructor({
        game,
        name
    }) {
        super({ game, name, loadArray })
    }

    create() {
        super.create()

        this.girl = new Sprite(PIXI.utils.TextureCache.girl)
        this.girl.scale.set(0.2)
        this.addChild(this.girl)
    }

}