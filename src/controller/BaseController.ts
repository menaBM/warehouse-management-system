import { Menu } from "../view/menu";

export class BaseController {
  protected actions: Map<string, { (): any }> = new Map();
  protected menu: Menu;
  private running: boolean = true;

  constructor(menu: Menu) {
    this.menu = menu;
  }

  async rootAction(): Promise<void> {
    this.actions.set("Exit", this.exitAction);
    this.running = true;
    while (this.running) {
      const choice: string = await this.menu.selectOption(
        "Please select an option:",
        [...this.actions.keys()],
      );
      let index: number = parseInt(choice) - 1;

      if (!Number.isNaN(index) && index <= this.actions.size && index >= 0) {
        await [...this.actions.values()][index]();
      }
    }
  }

  addNewAction(text: string, callback: { (): any }): void {
    this.actions.set(text, callback);
  }

  protected exitAction = (): void => {
    this.running = false;
  };
}
