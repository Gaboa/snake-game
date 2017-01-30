import Game from './Game';
import World from './World';
import Snake from './Snake';

let difficultyInput = document.querySelector('.buttons__difficulty');
difficultyInput.addEventListener('change', function(event) {
    game.setDifficultyLevel(11 - this.value);
});

let game = new Game(600, 400, 11 - difficultyInput.value);
let world = new World(game);
let snake = new Snake(game, world);
game.update = world.update.bind(world);