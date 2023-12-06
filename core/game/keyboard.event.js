class KeyboardEvent {
  constructor(player) {
    this.player = player;
    this.initEvent();
  }

  initEvent() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "q":
          this.player.moveActions.LEFT = true;
          break;
        case "d":
          this.player.moveActions.RIGHT = true;
          break;
        case " ":
          this.player.jump();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "q":
          this.player.moveActions.LEFT = false;
          break;
        case "d":
          this.player.moveActions.RIGHT = false;
          break;

        default:
          break;
      }
    });
  }
}
