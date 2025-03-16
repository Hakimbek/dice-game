import Table from "cli-table3";

export default class FirstMoveProbability {
    constructor() {
        this.table = new Table({
            head: ['Probability', 'Description']
        })

        this.table.push(['0, 1', 'You have the 50% probability to choose correct one.'])
    }

    print() {
        console.log(this.table.toString());
    }
}