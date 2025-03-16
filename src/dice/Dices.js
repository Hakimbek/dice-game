export default class Dices {
    dices = process.argv.slice(2).map(dice => dice.split(","));
}