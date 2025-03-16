import Table from "cli-table3";
import ErrorTable from "./ErrorTable.js";

export default class ConversationTable {
    static count = 1;
    static table = new Table({
        head: ['#', 'User', 'Computer'],
        colWidths: [5, 80, 80]
    });

    constructor() {
        if (new.target === ConversationTable) {
            new ErrorTable(
                'ConversationTable error',
                'Cannot instantiate an abstract class!'
            ).print();
        }
    }

    static print() {
        console.clear();
        console.log(ConversationTable.table.toString());
    }
}