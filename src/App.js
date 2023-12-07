import PromotionController from "./cotrollers/PromotionController.js";

class App {
  async run() {
    const promotionController = new PromotionController();
    promotionController.start();
  }
}

export default App;
