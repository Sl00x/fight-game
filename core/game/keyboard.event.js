class KeyboardEvent {
  constructor() {
    this.initEvent();
  }

  initEvent() {
    const gameManager = GameManager.getInstance();
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "q":
          gameManager.player.moveActions.left = true;
          break;
        case "d":
          gameManager.player.moveActions.right = true;
          break;
        case " ":
          gameManager.player.jump();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "q":
          gameManager.player.moveActions.left = false;
          break;
        case "d":
          gameManager.player.moveActions.right = false;
          break;

        default:
          break;
      }
    });
  }
}
