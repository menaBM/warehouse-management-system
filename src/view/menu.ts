const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class Menu {
  printOptions(options: Array<string>): void {
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }

  async selectOption(message: string, options: Array<string>): Promise<string> {
    console.log(`\n${message}\n`);
    this.printOptions(options);
    let choice: string = await this.getInput(
      "\nPlease enter number of selection:\n",
    );
    return choice;
  }

  async getInput(message: string = ""): Promise<string> {
    let input: string = await new Promise<string>((resolve) =>
      rl.question(message, resolve),
    );
    return input;
  }

  outputMessage(message: string = ""): void {
    console.log("\n" + message);
  }

  drawTable(data: Array<Array<string>>): void {
    console.log(`\n`);
    data.forEach((entry) => {
      let row: string = ``;
      entry.forEach((column) => {
        const maxLength: number = 25;
        column =
          column.length > maxLength
            ? column.substring(0, maxLength - 1)
            : column + " ".repeat(maxLength - column.length);
        row += column;
      });
      console.log(`${row}\n`);
    });
  }

  quit(): void {
    rl.close();
  }
}
