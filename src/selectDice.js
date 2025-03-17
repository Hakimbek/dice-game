import ComputerMessage from "./message/ComputerMessage.js";
import OptionsTable from "./message/OptionsTable.js";
import UserDice from "./dice/UserDice.js";
import UserMessage from "./message/UserMessage.js";
import ComputerDice from "./dice/ComputerDice.js";

export default async function selectDice(dices, isUserMoveFirst) {
    let userDice;
    let computerDice;

    if (isUserMoveFirst) {
        ComputerMessage.add('You make the first move. Choose your dice.').print();

        new OptionsTable(dices).print();

        userDice = await new UserDice(dices).select();

        UserMessage.add(`I select ${userDice.index} ([${userDice.value}]) dice.`);

        dices.splice(userDice.index, 1);

        computerDice = new ComputerDice(dices).select();

        ComputerMessage.add(`I select [${computerDice.value}] dice.`).print();
    } else {
        computerDice = new ComputerDice(dices).select();

        ComputerMessage
            .add(`I make the first move and choose [${computerDice.value}] dice.`)
            .add('Choose your dice.')
            .print();

        dices.splice(computerDice.index, 1);

        new OptionsTable(dices).print();

        userDice = await new UserDice(dices).select();

        UserMessage
            .add(`I select ${userDice.index} ([${userDice.value}]) dice.`)
            .print();
    }

    return [userDice, computerDice];
}
