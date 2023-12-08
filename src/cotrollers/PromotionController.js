import InputView from "../views/InputView.js";
import MenuValidator from "./../validator/MenuValidator.js";
import MENUS from "../datas/menu.js";
import Menu from "./../models/Menu.js";
import CalculatePromotion from "./../models/CalculatePromotion.js";
import OutputView from "./../views/OutputView.js";

class PromotionController {
  #allMenus = [];
  constructor() {}

  async start() {
    const date = await this.getDate();
    const menuInfos = await this.getMenu();
    const matchedMenu = this.matchCategory(menuInfos);
    this.setMenu(matchedMenu);
    const totalPrice = this.getTotalPrice(matchedMenu);
    const calcultatePromotion = new CalculatePromotion(
      Number(date),
      totalPrice,
      menuInfos
    );

    this.print(calcultatePromotion, totalPrice, menuInfos);
  }

  getTotalPrice(menus) {
    const totalPrice = menus.reduce((acc, { price, amount }) => {
      return acc + amount * price;
    }, 0);

    return totalPrice;
  }

  async getDate() {
    const date = await InputView.readDate();
    return Number(date);
  }

  async getMenu() {
    const menu = await InputView.readMenu();
    const menus = menu.split(",");
    const menuInfos = menus.map((menu) => {
      const [menuItem, amount] = menu.split("-");
      return { menuItem, amount: Number(amount) };
    });

    new MenuValidator(menus, menuInfos);
    return menuInfos;
  }

  matchCategory(menuInfos) {
    const matchedMenu = menuInfos.map(({ menuItem, amount }) => {
      const { category, price } = MENUS.find((menu) => menu.name === menuItem);
      return { category, price, amount, menuItem };
    });

    return matchedMenu;
  }

  setMenu(menus) {
    const allMenus = menus.forEach(({ menuItem, price, amount, category }) => {
      new Menu(menuItem, price, category, amount);
    });

    this.#allMenus = allMenus;
  }

  print(calcultatePromotion, totalPrice, menuInfos) {
    const totalDiscountPrice = calcultatePromotion.getDiscountTotalPrice();
    this.printMenus(menuInfos);
    this.printBeforeDiscount(totalPrice);
    this.printBenefits(calcultatePromotion);
    this.printPrensent();
    this.printAfterDiscount();
    this.printEventBadge();
  }

  printEventBadge() {
    OutputView.printEventBadge();
    OutputView.printMessage();
  }

  printAfterDiscount(totalDiscountPrice) {
    OutputView.printAfterDiscount();
    OutputView.printMessage(totalDiscountPrice + "원");
  }

  printPrensent() {
    OutputView.printPresentMenu();
    OutputView.printMessage();
  }

  printBeforeDiscount(totalPrice) {
    OutputView.printBeforeDiscount();
    OutputView.printMessage(`${totalPrice} 원`);
  }

  printMenus(menuInfos) {
    OutputView.printMenu();
    menuInfos.forEach(({ menuItem, amount }) => {
      OutputView.printMessage(`${menuItem} ${amount}개`);
    });
  }

  printBenefits(calcultatePromotion) {
    OutputView.printBenefitDetails();
    const {
      christmsDiscount,
      aweekDiscount,
      specialDiscount,
      presentDiscount,
    } = calcultatePromotion.getResult();

    OutputView.printMessage(christmsDiscount);
    OutputView.printMessage(aweekDiscount);
    OutputView.printMessage(specialDiscount);
    OutputView.printMessage(presentDiscount);
  }
}

export default PromotionController;
