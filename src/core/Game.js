import { Application } from 'pixi.js'

export default class Game extends Application {

    constructor({
        width,
        height,
        isGlobalGame = true
    }) {
        super({ width, height })

        // Add canvas to the page
        document.body.appendChild(this.view)

        // Write game in global variable
        if (isGlobalGame) window.game = this

        // Init levels array
        this.levels = []
    }

    startLevel(Level, options = {}) {
        const level = new Level(Object.assign({ game: this }, options))
        this.levels.push(level)
        this.level = level
    }

    getLevelByName(name) {
        let level = this.levels.filter(l => l.name === name)[0]
        return level ? level : null
    }

}