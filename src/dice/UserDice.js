import Dice from "./Dice.js";
import Reader from "../readline/Reader.js";
import DiceProbability from "../probabilty/DiceProbability.js";

export default class UserDice extends Dice {
    constructor(dices) {
        super(dices);
    }

    async select() {
        this.index = await new Reader().read(
            `^([0-${this.dices.length - 1}xX?])$`,
            'Choose your dice',
            new DiceProbability()
        );
        this.value = this.dices[this.index];
        this.length = this.value.length;

        return this;
    }
}