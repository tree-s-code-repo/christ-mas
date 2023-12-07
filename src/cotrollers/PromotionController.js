import InputView from "../views/InputView.js";
import MENUS from "./../datas/menu.js";

console.log(MENUS);

class PromotionController {
  constructor() {}

  async start() {
    await this.getDate();
    await this.getMenu();
  }

  async getDate() {
    const date = await InputView.readDate();
    console.log(date);
  }

  async getMenu() {
    const menu = await InputView.readMenu();
    const menuInfos = menu.split(", ").map((menu) => {
      const [menuItem, amount] = menu.split("-");
      return { menuItem, amount: Number(amount) };
    });

    menuInfos.forEach(({ menuItem }) => {
      const result = MENUS.some(({ name }) => name === menuItem);
      //메뉴를 반복문으로 돌려 하나라도 일치하지 않는게 있다면  false 를 반환한다.
      if (!result) {
        throw new Error("존재하지않는 메뉴입니다");
      }
    });
  }
}

export default PromotionController;
