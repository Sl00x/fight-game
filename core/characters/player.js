class Player extends MovableEntity {
  constructor(position) {
    const spritesheet = getRaider1Spritesheet();
    super("player", position, 50, getRaider1Spritesheet());
    const colliderSize = {
      w: spritesheet.colliderWidth,
      h: spritesheet.colliderHeight,
    };
    this.scale = 1.2;
    this.size = {
      w: colliderSize.w * this.scale,
      h: colliderSize.h * this.scale,
    };
    this.speed = 2;
  }

  update() {
    super.update();
    const currentScene = GameManager.getInstance().currentScene;
    if (this.position.x < currentScene.padding) {
      scene.backgroundOffset -= currentScene.padding - this.position.x;
      this.position.x = currentScene.padding;
    } else if (
      this.position.x >
      currentScene.canvas.width - currentScene.padding
    ) {
      scene.backgroundOffset -=
        currentScene.canvas.width - currentScene.padding - this.position.x;
      this.position.x = currentScene.canvas.width - currentScene.padding;
    }
  }
}
