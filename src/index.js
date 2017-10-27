import './index.css'
import { Game } from './core'
import { Preload } from './levels'

const game = new Game({
    width: 500,
    height: 300
})

game.startLevel(Preload, { name: 'preload' })