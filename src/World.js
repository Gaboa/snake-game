import Element from './Element';

export default class World {
    constructor(game) {
        const PIXEL_WIDTH = 10;

        this.game = game;
        this.game.world = this;

        this.food = [];
        this.foodContainer = new PIXI.Container();
        this.game.stage.addChild(this.foodContainer);
        this.foodColor = 0xFF0000;

        this.pixel = {};
        this.pixel.x = PIXEL_WIDTH;
        this.pixel.y = PIXEL_WIDTH;
        this.pixelsInHeight = this.game.height / PIXEL_WIDTH;
        this.pixelsInWidth = this.game.width / PIXEL_WIDTH;

        this.initKeyboard();
        setTimeout(() => {
            this.addFood();
        }, Math.random() * 10000);
    }
    initKeyboard() {
        window.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.snake.head.oldDirection = this.snake.head.direction;
            switch (event.keyCode) {
                case 37:
                    if (this.snake.head.oldDirection == 'right') return;
                    this.snake.head.nextTickDirection = 'left';
                    break;
                case 38:
                    if (this.snake.head.oldDirection == 'down') return;
                    this.snake.head.nextTickDirection = 'up';
                    break;
                case 39:
                    if (this.snake.head.oldDirection == 'left') return;
                    this.snake.head.nextTickDirection = 'right';
                    break;
                case 40:
                    if (this.snake.head.oldDirection == 'up') return;
                    this.snake.head.nextTickDirection = 'down';
                    break;
            }
        });
    }
    update() {
        if (this.snake.isAlive) {
            this.snake.head.updateHead();
            this.snake.elements.forEach((element, index, elements) => {
                if (index != 0) {
                    element.update(index, elements);
                }
            });
            if (this.snake.checkCollisionWithFood(this.food)) {
                this.snake.addElement();
                this.game.updateScore();
            }
            
            if (this.snake.checkCollisionWithBody(this.snake.elements)) {
                this.snake.isAlive = false;
            }
        } else {
            console.log(`You are dead!`);
        }
    }
    addFood() {
        if (!this.snake.isAlive) return;
        let coords = this.getRandomPosition();
        let newFood = new Element({
            game: this.game,
            container: this.foodContainer,
            width: this.game.world.pixel.x,
            height: this.game.world.pixel.y,
            x: coords.x,
            y: coords.y,
            color: this.foodColor
        });
        this.food.push(newFood);
        setTimeout(() => {
            this.addFood();
        }, Math.random() * 10000);
    }
    getRandomPosition() {
        let x = Math.floor(Math.random() * this.pixelsInWidth) * this.pixel.x;
        let y = Math.floor(Math.random() * this.pixelsInHeight) * this.pixel.y;
        let result = {
            x,
            y
        };
        return result;
    }
}
