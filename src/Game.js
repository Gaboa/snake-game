export default class Game {
    constructor(width, height, level) {
        this.counter = 0;
        this.level = level;
        this.score = 0
        this.scoreElement = document.querySelector('.score__sum');

        this.width = width;
        this.height = height;
        this.renderer = PIXI.autoDetectRenderer(this.width, this.height);

        let gameContainer = document.querySelector('.game');
        gameContainer.appendChild(this.renderer.view);
        
        this.stage = new PIXI.Container();
        this.start();
    }
    start() {
        requestAnimationFrame(this.start.bind(this));

        this.counter++;
        if (this.counter % this.level == 0) {
            this.update();

            this.renderer.render(this.stage);
        } 
    }
    update() {
        
    }
    setDifficultyLevel(level) {
        this.level = level;
    }
    updateScore() {
        this.score += this.level;
        this.scoreElement.textContent = this.score;
    }
}
