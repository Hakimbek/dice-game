import ErrorTable from "../message/ErrorTable.js";
import Dices from "../dice/Dices.js";

export default class Validation extends Dices{
    constructor() {
        super();
        this.#validateDicesLength();
        this.#validateDiceLength();
        this.#validateDiceValue();
    }

    #validateDicesLength() {
        if (this.dices.length < 3) {
            new ErrorTable(
                'Invalid argument provided',
                'You specified only 2 dice. You should specify 3 or more dices.'
            ).print();
        }
    }

    #validateDiceLength() {
        for (let dice of this.dices) {
            if (dice.length < 6) {
                new ErrorTable(
                    'Invalid argument provided',
                    `Dice at least should have 6 integers. Your dice has ${dice.length} integers.`
                ).print();
            }
        }
    }

    #validateDiceValue() {
        for (let dice of this.dices) {
            for (const value of dice) {
                if (!isFinite(value)) {
                    new ErrorTable(
                        'Invalid argument provided',
                        `Please, pass only integer type as dice value. '${value}' is not integer.`
                    ).print();
                }
            }
        }
    }
}