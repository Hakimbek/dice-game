import Generator from "./generator/Generator.js";
import ComputerMessage from "./message/ComputerMessage.js";
import OptionsTable from "./message/OptionsTable.js";
import Reader from "./readline/Reader.js";
import FirstMoveProbability from "./probabilty/FirstMoveProbability.js";
import UserMessage from "./message/UserMessage.js";

export default async function identifyFirstMove() {
    const generator = new Generator();
    const key = generator.generateKey();
    const computerSelection = generator.generateInt(0,1);
    const hmac = generator.generateHMAC(computerSelection, key);

    ComputerMessage
        .add(`Let's determine who makes the first move.`)
        .add('I selected a random value in the range 0..1')
        .add(`HMAC=${hmac}`)
        .add('Try to guess my selection.')
        .print();

    new OptionsTable([0, 1]).print();

    const userSelection = await new Reader().read(
        /^[01xX?]$/,
        'Select',
        new FirstMoveProbability()
    );

    UserMessage
        .add(`I select ${userSelection}.`)
        .print();

    ComputerMessage
        .add(`My selection is ${computerSelection}.`)
        .add(`KEY=${key}`)
        .print();

    return computerSelection === Number(userSelection);
}