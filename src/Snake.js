import Element from './Element';

export default class Snake {
    constructor(game, world) {
        this.game = game;
        this.world = world;

        this.container = new PIXI.Container();
        this.game.stage.addChild(this.container);

        this.isAlive = true;
        this.elements = [];
        this.length = 3;
        this.init();
    }
    init() {
        this.head = this.addElement();
        this.world.snake = this;
        this.addElement();
        this.addElement();
    }
    addElement(x = 0, y = 0, direction = 'right') {
        let lastElement = this.elements[this.elements.length - 1];
        let color;
        if (lastElement) {
            let coords = this.getNewElementPosition(lastElement);
            direction = lastElement.direction;
            x = coords.x;
            y = coords.y;
            color = 0x888888;
        } else {
            color = 0xDDDDDD;
        }
        let el = new Element({
            game: this.game,
            container: this.container,
            width: this.world.pixel.x,
            height: this.world.pixel.y,
            x: x,
            y: y,
            direction: direction,
            color: color
        });
        this.elements.push(el);
        return el;
    }
    getNewElementPosition(lastElement) {
        let result = {};
        switch (lastElement.direction) {
            case 'right':
                result.x = lastElement.x - this.world.pixel.x;
                result.y = lastElement.y;
                break;
            case 'left':
                result.x = lastElement.x + this.world.pixel.x;
                result.y = lastElement.y;
                break;
            case 'up':
                result.x = lastElement.x;
                result.y = lastElement.y + this.world.pixel.y;
                break;
            case 'down':
                result.x = lastElement.x;
                result.y = lastElement.y - this.world.pixel.y;
                break;
        }
        return result;
    }
    checkCollisionWithBody(arrayOfElements) {
        let result = arrayOfElements.filter((element) => {
            return element.x == this.head.x && element.y == this.head.y;
        });
        return result[1] || false;
    }
    checkCollisionWithFood(arrayOfFood) {
        let result = [];
        arrayOfFood.forEach((food, indexOfFood) => {
            if (food.x == this.head.x && food.y == this.head.y) {
                result.push(food);
                arrayOfFood[indexOfFood].parent.removeChild(arrayOfFood[indexOfFood]);
                arrayOfFood.splice(indexOfFood, 1);
            }
        });
        return result[0] || false;
    }
}
