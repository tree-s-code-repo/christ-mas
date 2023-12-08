import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu() {
    Console.print("<주문 메뉴>");
  },

  printBeforeDiscount() {
    Console.print("<할인 전 총주문 금액>");
  },

  printPresentMenu() {
    Console.print("<증정 메뉴>");
  },

  printBenefitDetails() {
    Console.print("<혜택 내역>");
  },

  printAfterDiscount() {
    Console.print("<할인 후 예상 결제 금액>");
  },

  printEventBadge() {
    Console.print("<12월 이벤트 배지>");
  },

  printMessage(message) {
    Console.print(message);
  },
};

export default OutputView;
