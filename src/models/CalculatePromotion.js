class CalculatePromotion {
  #special = [3, 10, 17, 24, 25, 31];
  #date;
  #totalPrice;
  #menus;
  totalDiscountPrice = 0;

  constructor(date, totalPrice, menus) {
    this.#date = date;
    this.#totalPrice = totalPrice;
    this.#menus = menus;
  }

  calculate() {}

  christmas() {
    const date = this.#date - 1;
    const resultPrice = 1000 + date * 100;

    return resultPrice;
  }

  getResult() {
    const { christms, aweek, special, present } = this.getDiscountPrice();

    const christmsDiscount = `크리스마스 디데이 할인 : -${christms}원`;
    const isWeekend = this.isWeekend() ? "평일" : "주말";
    const aweekDiscount = `${isWeekend} 할인 : -${aweek}원`;
    const specialDiscount = `특별 할인 : -${special}원`;
    const presentDiscount = `증정 이벤트 : -${present}원`;

    return {
      christmsDiscount,
      aweekDiscount,
      specialDiscount,
      presentDiscount,
    };
  }

  getDiscountPrice() {
    const christms = this.christmas();
    const aweek = this.aWeek();
    const special = this.special();
    const present = this.present().price;

    return { christms, aweek, special, present };
  }

  getDiscountTotalPrice() {
    const { christms, aweek, special, present } = this.getDiscountPrice();
    this.totalDiscountPrice = christms + aweek + special + present;
  }

  aWeek() {
    const discountCategory = this.isWeekend() ? "메인" : "디저트";
    const discountedMenus = this.#menus.filter(
      ({ category }) => category === discountCategory
    );

    if (discountCategory.length === 0) {
      return 0;
    }

    const totalAmount = discountedMenus.reduce((acc, { amount }) => {
      return acc + amount;
    }, 0);

    return totalAmount * 2023;
  }

  isWeekend() {
    const promteDate = "2023-12-";
    const day = new Date(`${promteDate}${this.#date}`).getDay();

    return day === 5 || day === 6; //주말
  }

  special() {
    if (this.#special.includes(this.#date)) {
      return 1000;
    }

    return 0;
  }

  present() {
    if (this.#totalPrice > 120000) {
      return { present: "샴페인", price: 25000 };
    }

    return { present: "none", price: 0 };
  }

  getPresentName() {
    return this.present().present;
  }
}

export default CalculatePromotion;

// 크리스마스 디데이 할인
// 평일 할인(일요일~목요일): 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
// 주말 할인(금요일, 토요일): 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
// 특별 할인: 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인

// 증정 이벤트: 할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
// 이벤트 기간: '크리스마스 디데이 할인'을 제외한 다른 이벤트는 2023.12.1 ~ 2023.12.31 동안 적용
