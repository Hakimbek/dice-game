import Table from "cli-table3";

export default class ErrorTable {
    constructor(error, message) {
        this.table = new Table({
            head: ['Error', 'Description']
        })
        this.table.push([error, message]);
    }

    print() {
        console.log(this.table.toString());
        process.exit(0);
    }
}