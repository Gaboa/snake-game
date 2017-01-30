export default class Element extends PIXI.Graphics {
    constructor({ game, container, width, height, x, y, direction, color }) {
        super();
        this.game = game;
        this.container = container;

        this.elementWidth = width;
        this.elementHeight = height;
        this.direction = direction;
        this.oldDirection = direction;
        this.x = x;
        this.y = y;

        this.color = color;
        this.init();
    }
    init(color) {
        this.lineStyle(1, 0xDDDDDD, 1);
        this.beginFill(this.color, 1);
        this.drawRect(0, 0, this.elementWidth, this.elementHeight);
        this.container.addChild(this);
    }
    checkBounds() {
        if (this.x > this.game.width) {
            this.x = 0;
        }
        if (this.y > this.game.height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = this.game.width;
        }
        if (this.y < 0) {
            this.y = this.game.height;
        }
    }
    updateHead() {
        this.oldX = this.x;
        this.oldY = this.y;
        if (this.nextTickDirection) {
            this.direction = this.nextTickDirection;
            this.nextTickDirection = null;
        }
        switch (this.direction) {
            case 'right':
                this.x = this.x + this.game.world.pixel.x;
                this.y = this.y;
                break;
            case 'left':
                this.x = this.x - this.game.world.pixel.x;
                this.y = this.y;
                break;
            case 'up':
                this.x = this.x;
                this.y = this.y - this.game.world.pixel.y;
                break;
            case 'down':
                this.x = this.x;
                this.y = this.y + this.game.world.pixel.y;
                break;
        }
        this.checkBounds();
    }
    update(index, elements) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = elements[index - 1].oldX;
        this.y = elements[index - 1].oldY;
    }
}
