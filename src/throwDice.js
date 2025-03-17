import ComputerMessage from "./message/ComputerMessage.js";
import OptionsTable from "./message/OptionsTable.js";
import UserMessage from "./message/UserMessage.js";

export default async function throwDice(pronoun, dice, rolling) {
    ComputerMessage
        .add(`It's time to ${pronoun} roll.`)
        .add(`I selected a random value in the range 0..${dice.length - 1}.`)
        .add(`HMAC=${rolling.hmac}`)
        .add(`Add your number modulo ${dice.length}.`)
        .print();

    new OptionsTable([...dice.value.keys()]).print();

    await rolling.read();

    UserMessage.add(`I select ${rolling.userValue}.`).print();

    rolling.calculateModulo();

    ComputerMessage
        .add(`My number is ${rolling.computerValue}.`)
        .add(`KEY=${rolling.key}`)
        .add(`The fair number generation result is ${rolling.computerValue} + ${rolling.userValue} = ${rolling.modulo} (mod ${dice.length}).`)
        .add(`${pronoun} roll result is ${rolling.result}.`)
        .print();
}