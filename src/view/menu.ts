const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class Menu {
    printOptions (options: Array<string>) {
      options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`)
      })
    }
  
    async selectOption (message: string, options: Array<string>) {
      console.log(`\n${message}\n`)
      this.printOptions(options)
      let choice = await this.getInput('\nPlease enter number of selection:\n')
      return choice
    }
  
    async getInput (message: string = ''){
      let res = await new Promise<string>(resolve => rl.question(message, resolve))
      return res;
    }

    outputMessage (message: string = '') {
      console.log(message)
    }

    drawTable (data: Array<Array<string>>) {
      data.forEach(entry => {
        let row = ``
        entry.forEach(column => {
          const maxLength = 25 
          column = column.length > maxLength ? column.substring(0, maxLength - 1) : column + " ".repeat(maxLength - column.length)
          row += column
        })
        console.log(`${row}\n`)
      })
    }

    quit () {
      rl.close()
    }
}