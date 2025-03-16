import ErrorTable from "../message/ErrorTable.js";

export default class Dice {
    constructor(dices) {
        if (new.target === Dice) {
            new ErrorTable('Dice error', 'Cannot instantiate an abstract class!').print();
        }

        this.dices = dices;
    }
}