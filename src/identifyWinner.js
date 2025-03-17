import ComputerMessage from "./message/ComputerMessage.js";

export default function identifyWinner(userResult, computerResult) {
    if (userResult > computerResult) {
        ComputerMessage
            .add(`You win (${userResult} > ${computerResult})`)
            .print();
    } else if (userResult < computerResult) {
        ComputerMessage
            .add(`I win (${userResult} < ${computerResult})`)
            .print();
    } else {
        ComputerMessage
            .add(`Draw win (${userResult} = ${computerResult})`)
            .print();
    }
}