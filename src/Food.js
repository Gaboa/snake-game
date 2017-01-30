import Element from './Element';

export default class Food extends Element {
    constructor({ game, container, width, height, x, y, color }) {
        super({ game, container, width, height, x, y, direction, color });
        
    }
}
