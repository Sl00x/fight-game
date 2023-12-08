class Enemy extends IA {
  constructor(name, position, spritesheet) {
    super(name, position, 50, spritesheet);
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
}
