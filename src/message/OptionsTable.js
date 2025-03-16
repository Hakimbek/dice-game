import Table from "cli-table3";

export default class OptionsTable {
    constructor (options) {
        this.table = new Table({
            head: ["Options", "Description"],
        });

        for (let i = 0; i < options.length; i++) {
            this.table.push([i, String(options[i])]);
        }

        this.table.push(['X', 'Exit']);
        this.table.push(['?', 'Help']);
    }

    print () {
        console.log(this.table.toString());
    }
}