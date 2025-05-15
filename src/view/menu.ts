const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class Menu {
    // display () {
    //   // while true
    //   this.printOptions()
    //   this.selectOption()
    // }
  
    printOptions (options: Array<string>) {
      console.log("print options", options[0])
      options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`)
      })
    }
  
    async selectOption (message: string, options: Array<string>) {
      console.log(message)
      this.printOptions(options)
      let choice = await this.getInput('Please enter selection:\n')
      return choice
    }
  
    async getInput(message: string = ''){
      let res = await new Promise<string>(resolve => rl.question(message, resolve))
    //   .finally(() => rl.close());
    
    
   
  
      return res;
    }

    outputMessage (message: string = '') {
      console.log(message)
    }
}