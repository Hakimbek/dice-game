import ConversationTable from "./ConversationTable.js";

export default class UserMessage extends ConversationTable {
    static add(message) {
        ConversationTable.table.push([ConversationTable.count++, message, '']);

        return this;
    }
}