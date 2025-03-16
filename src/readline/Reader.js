import readline from "readline";

export default class Reader {
    #ask(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }

    async read(regex, question, probability) {
        let answer;

        while (true) {
            answer = await this.#ask(`${question}: `);

            if (answer === '?') {
                probability.print();
                continue;
            }

            if (answer.match(regex)) {
                break;
            }

            console.log('Please, select appropriate value from options!');
        }

        if (answer.match(`^([xX])$`)) process.exit(0);

        return answer;
    }
}