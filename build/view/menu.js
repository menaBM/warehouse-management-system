"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Menu {
    printOptions(options) {
        options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }
    selectOption(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n${message}\n`);
            this.printOptions(options);
            let choice = yield this.getInput('\nPlease enter number of selection:\n');
            return choice;
        });
    }
    getInput() {
        return __awaiter(this, arguments, void 0, function* (message = '') {
            let res = yield new Promise(resolve => rl.question(message, resolve));
            return res;
        });
    }
    outputMessage(message = '') {
        console.log(message);
    }
    drawTable(data) {
        data.forEach(entry => {
            let row = ``;
            entry.forEach(column => {
                const maxLength = 25;
                column = column.length > maxLength ? column.substring(0, maxLength - 1) : column + " ".repeat(maxLength - column.length);
                row += column;
            });
            console.log(`${row}\n`);
        });
    }
    quit() {
        rl.close();
    }
}
exports.Menu = Menu;
