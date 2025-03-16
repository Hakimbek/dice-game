import Validation from "./validation/Validation.js";
import Generator from "./generator/Generator.js";
import ComputerMessage from "./message/ComputerMessage.js";
import OptionsTable from "./message/OptionsTable.js";
import UserMessage from "./message/UserMessage.js";
import Reader from "./readline/Reader.js";
import FirstMoveProbability from "./probabilty/FirstMoveProbability.js";
import Dices from "./dice/Dices.js";
import UserDice from "./dice/UserDice.js";
import ComputerDice from "./dice/ComputerDice.js";
import Rolling from "./rolling/Rolling.js";

(async () => {
    new Validation();

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

    const isUserMoveFirst = computerSelection === Number(userSelection);
    const dices = new Dices().dices;

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

    const userRolling = new Rolling(userDice.value);
    const computerRolling = new Rolling(computerDice.value);

    ComputerMessage
        .add(`It's time to ${isUserMoveFirst ? 'your' : 'my'} roll.`)
        .add(`I selected a random value in the range 0..${isUserMoveFirst ? userDice.length - 1 : computerDice.length - 1}.`)
        .add(`HMAC=${isUserMoveFirst ? userRolling.hmac : computerRolling.hmac}`)
        .add(`Add your number modulo ${isUserMoveFirst ? userDice.length : computerDice.length}.`)
        .print();

    if (isUserMoveFirst) {
        new OptionsTable([...userDice.value.keys()]).print();

        await userRolling.read();

        userRolling.calculateModulo();

        UserMessage
            .add(`I select ${userRolling.userValue}.`)
            .print();

        ComputerMessage
            .add(`My number is ${userRolling.computerValue}.`)
            .add(`KEY=${userRolling.key})`)
            .add(`The fair number generation result is ${userRolling.userValue} + ${userRolling.computerValue} = ${userRolling.modulo} (mod ${userDice.length}).`)
            .add(`Your roll result is ${userRolling.result}.`)
            .print();
    } else {
        new OptionsTable([...computerDice.value.keys()]).print();

        await computerRolling.read();

        computerRolling.calculateModulo();

        UserMessage
            .add(`I select ${computerRolling.userValue}.`)

        ComputerMessage
            .add(`My number is ${computerRolling.computerValue}.`)
            .add(`KEY=${computerRolling.key}`)
            .add(`The fair number generation result is ${computerRolling.computerValue} + ${computerRolling.userValue} = ${computerRolling.modulo} (mod ${computerDice.length}).`)
            .add(`My roll result is ${computerRolling.result}.`)
            .print();
    }

    ComputerMessage
        .add(`It's time for ${isUserMoveFirst ? 'my' : 'your'} roll.`)
        .add(`I selected a random value in the range 0..${isUserMoveFirst ? computerDice.length - 1: userDice.length - 1}.`)
        .add(`HMAC=${isUserMoveFirst ? computerRolling.hmac : userRolling.hmac}`)
        .add(`Add your number modulo ${isUserMoveFirst ? computerDice.length : userDice.length}.`)
        .print();

    if (isUserMoveFirst) {
        new OptionsTable([...computerDice.value.keys()]).print();

        await computerRolling.read();

        computerRolling.calculateModulo();

        UserMessage
            .add(`I select ${computerRolling.userValue}.`)

        ComputerMessage
            .add(`My number is ${computerRolling.computerValue}.`)
            .add(`KEY=${computerRolling.key}`)
            .add(`The fair number generation result is ${computerRolling.computerValue} + ${computerRolling.userValue} = ${computerRolling.modulo} (mod ${computerDice.length}).`)
            .add(`My roll result is ${computerRolling.result}.`)
            .print();
    } else {
        new OptionsTable([...userDice.value.keys()]).print();

        await userRolling.read();

        userRolling.calculateModulo();

        UserMessage
            .add(`I select ${userRolling.userValue}.`)
            .print();

        ComputerMessage
            .add(`My number is ${userRolling.computerValue}.`)
            .add(`KEY=${userRolling.key})`)
            .add(`The fair number generation result is ${userRolling.userValue} + ${userRolling.computerValue} = ${userRolling.modulo} (mod ${userDice.length}).`)
            .add(`Your roll result is ${userRolling.result}.`)
            .print();
    }

    if (userRolling.result > computerRolling.result) {
        ComputerMessage
            .add(`You win (${userRolling.result} > ${computerRolling.result})`)
            .print();
    } else if (userRolling.result < computerRolling.result) {
        ComputerMessage
            .add(`I win (${userRolling.result} < ${computerRolling.result})`)
            .print();
    } else {
        ComputerMessage
            .add(`Draw win (${userRolling.result} = ${computerRolling.result})`)
            .print();
    }
})();