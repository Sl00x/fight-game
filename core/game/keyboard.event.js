class KeyboardEvent {
  constructor() {
    this.initEvent();
  }

  initEvent() {
    const gameManager = GameManager.getInstance();
    const player = gameManager.player;
    document.addEventListener("keydown", (event) => {
      switch (event.key.toLowerCase()) {
        case "q":
          player.actions.left = true;
          player.lastDirection = "left";
          break;
        case "d":
          player.actions.right = true;
          player.lastDirection = "right";
          break;
        case " ":
          player.jump();
          break;
        case "shift":
          player.actions.running = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key.toLowerCase()) {
        case "q":
          player.actions.left = false;
          if (player.lastDirection === "left" && player.actions.right) {
            player.lastDirection = "right";
          }
          break;
        case "d":
          player.actions.right = false;
          if (player.lastDirection === "right" && player.actions.left) {
            player.lastDirection = "left";
          }
          break;
        case "shift":
          player.actions.running = false;
          break;
        default:
          break;
      }
    });

    document.addEventListener("mousedown", (event) => {
      switch (event.button) {
        case 0:
          player.actions.primaryAttacking = true;
          player.currentAttack = "primary";
          break;
        case 2:
          player.actions.secondaryAttacking = true;
          player.currentAttack = "secondary";
          break;
        default:
          break;
      }
    });

    document.addEventListener("mouseup", (event) => {
      switch (event.button) {
        case 0:
          player.actions.primaryAttacking = false;
          break;
        case 2:
          player.actions.secondaryAttacking = false;
          break;
        default:
          break;
      }
    });

    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
}
