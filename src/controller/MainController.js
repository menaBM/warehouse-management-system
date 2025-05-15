"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const BaseController_1 = require("./BaseController");
class MainController extends BaseController_1.BaseController {
    constructor(menu, controllers) {
        super(menu);
        controllers.forEach((value, key) => {
            this.actions.set(key, value.rootAction);
        });
    }
}
exports.MainController = MainController;
