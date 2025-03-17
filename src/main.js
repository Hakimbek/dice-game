import Validation from "./validation/Validation.js";
import Dices from "./dice/Dices.js";
import Rolling from "./rolling/Rolling.js";
import identifyFirstMove from "./identifyFirstMove.js";
import selectDice from "./selectDice.js";
import throwDice from "./throwDice.js";
import identifyWinner from "./identifyWinner.js";

(async () => {
    new Validation();

    const dices = new Dices().dices;
    const isUserMoveFirst = await identifyFirstMove();
    const [userDice, computerDice] = await selectDice(dices, isUserMoveFirst);
    const userRolling = new Rolling(userDice.value);
    const computerRolling = new Rolling(computerDice.value);

    if (isUserMoveFirst) {
        await throwDice('Your', userDice, userRolling);
        await throwDice('My', computerDice, computerRolling);
    } else {
        await throwDice('My', computerDice, computerRolling);
        await throwDice('Your', userDice, userRolling);
    }

    identifyWinner(userRolling.result, computerRolling.result);
})();