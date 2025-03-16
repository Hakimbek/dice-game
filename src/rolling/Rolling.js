import Generator from "../generator/Generator.js";
import Reader from "../readline/Reader.js";
import DiceProbability from "../probabilty/DiceProbability.js";

export default class Rolling {
    constructor(dice) {
        this.dice = dice;
        const generator = new Generator();
        this.key = generator.generateKey();
        this.computerValue = generator.generateInt(0, dice.length - 1);
        this.hmac = generator.generateHMAC(this.computerValue, this.key);
    }

    async read() {
        this.userValue = await new Reader().read(
            `^([0-${this.dice.length - 1}xX?])$`,
            'Choose your dice',
            new DiceProbability()
        );
    }

    calculateModulo() {
        this.modulo = (this.computerValue + Number(this.userValue)) % this.dice.length;
        this.result = this.dice[this.modulo];
    }
}