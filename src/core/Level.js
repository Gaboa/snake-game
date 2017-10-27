import { Container } from 'pixi.js'

export default class Level extends Container {

    constructor({
        game,
        name,
        index,
        loadArray = [],
        isAutoStartPreload = true,
        isAutoStartCreate = false
    }) {
        super()
        this.game = game
        if (index) {
            this.game.stage.addChildAt(this, index)
        } else {
            this.game.stage.addChild(this)
        }

        this.name = name

        if (isAutoStartPreload) this.preload(loadArray)
        if (isAutoStartCreate) this.create()
    }

    preload(loadArray, options = { autoLoad: true }) {
        if (this.name) console.log('Preload level %s', this.name)
        if (loadArray) this.game.loader.add(loadArray)
        if (options.autoLoad) this.game.loader.load(this.create.bind(this))
    }
    
    create() {
        if (this.name) console.log('Create level %s', this.name)
    }

}