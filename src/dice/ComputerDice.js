import Dice from "./Dice.js";
import Generator from "../generator/Generator.js";

export default class ComputerDice extends Dice {
    constructor(dices) {
        super(dices);
    }

    select() {
        this.index = new Generator().generateInt(0, this.dices.length - 1);
        this.value = this.dices[this.index];
        this.length = this.value.length;

        return this;
    }
}