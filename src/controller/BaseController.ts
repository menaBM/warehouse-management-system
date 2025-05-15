import { Menu } from "../view/menu";

export class BaseController {
    actions: Map< string, {(): any}> = new Map();
    menu: Menu;

    constructor (menu: Menu) {
       this.menu = menu;
    }

    rootAction = async() => {
        while (true) {
            const choice = await this.menu.selectOption("Please select an option:", [...this.actions.keys()]) 
            let index = parseInt(choice) - 1;

            // if ( !Number.isNaN(index) ) // && index in range
            // loop until valid choice, output error message

            await [...this.actions.values()][index]()
        }
    }
}