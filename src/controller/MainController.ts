import { BaseController } from "./BaseController";
import { Menu } from "../view/menu";

export class MainController extends BaseController {
 
  constructor (menu: Menu, controllers: Map<string, BaseController>) {
    super(menu)
    controllers.forEach((value, key) => {
        this.actions.set(key, value.rootAction.bind(value)) 
    })
  }
}