import MENUS from "../datas/menu.js";

class MenuValidator {
  constructor(menus, menuInfos) {
    this.menus = menus;
    this.menuInfos = menuInfos;
    this.start();
  }

  start() {
    this.validateAmount();
    this.validateForm();
    this.validateDuplicate();
    this.validtateCategory();
  }

  validateAmount() {
    const totalAmount = this.menuInfos.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

    if (totalAmount > 20) {
      throw new Error("20개를 초과할 수 업습니다");
    }
  }

  validateForm() {
    const regex = /^([^-]+)-(\d+)$/;

    this.menus.forEach((menu) => {
      const match = menu.match(regex);
      if (!match) {
        throw new Error("형식을 맞춰주세용");
      }
    });
  }

  validateDuplicate() {
    this.menuInfos.forEach(({ menuItem }) => {
      const result = MENUS.some(({ name }) => name === menuItem);
      if (!result) {
        throw new Error("존재하지않는 메뉴입니다");
      }
    });
  }

  validtateCategory() {
    const categories = new Set();

    this.menuInfos.forEach(({ menuItem }) => {
      const { category } = MENUS.find((menu) => menu.name === menuItem);
      categories.add(category);
    });

    if (categories.size === 1 && categories.has("음료")) {
      throw new Error("음료만 주문할 수 없습니다 !!!!!");
    }
  }
}

export default MenuValidator;
