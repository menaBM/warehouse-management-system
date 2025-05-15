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
exports.BaseController = void 0;
class BaseController {
    constructor(menu) {
        this.actions = new Map();
        this.menu = menu;
    }
    rootAction() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const choice = yield this.menu.selectOption("Please select an option:", [...this.actions.keys()]);
                let index = parseInt(choice) - 1;
                // if ( !Number.isNaN(index) ) // && index in range
                // loop until valid choice, output error message
                yield [...this.actions.values()][index]();
            }
        });
    }
}
exports.BaseController = BaseController;
