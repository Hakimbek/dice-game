import Table from "cli-table3";
import Dices from "../dice/Dices.js";

export default class DiceProbability extends Dices {
    constructor () {
        super();
        this.table = new Table({
            head: ['User dice v', ...this.dices.map(dice => dice.join(','))]
        })

        this.#calculateProbability();
    }

    #calculateProbability () {
        for (let a of this.dices) {
            const row = [a.join(',')];

            for (const b of this.dices) {
                const count = this.#countWins(a, b);
                const probability = count / (a.length * b.length);
                row.push(probability);
            }

            this.table.push(row);
        }

        return this;
    }

    #countWins(a, b) {
        let n = 0;

        for (let aElement of a) {
            for (let bElement of b) {
                if (aElement > bElement) n++;
            }
        }

        return n;
    }

    print () {
        console.log(this.table.toString());
    }
}