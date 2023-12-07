class Player extends Entity {
  constructor(position, showCollider) {
    super("player", position, 50, showCollider);
    this.size = { w: 32, h: 100 };
    this.speed = 10;
  }

  update = () => {
    if (this.canMove("right")) {
      this.move("right", this.speed);
    }
    if (this.canMove("left")) {
      this.move("left", this.speed);
    }
    this.gravity();
  };
}
