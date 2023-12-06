class Player extends Entity {
  constructor(position, showCollider) {
    super("player", position, 50, showCollider);
    this.size = { w: 32, h: 100 };
    this.speed = 10;
  }

  update = () => {
    if (
      this.moveActions.RIGHT &&
      (!this.collidings.right || this.collidings.right.weight < this.weight)
    ) {
      this.move(
        "RIGHT",
        (this.speed * (this.weight - (this.collidings.right?.weight ?? 0))) /
          this.weight,
        this.player
      );
    }
    if (
      this.moveActions.LEFT &&
      (!this.collidings.left || this.collidings.left.weight < this.weight)
    ) {
      this.move(
        "LEFT",
        (this.speed * (this.weight - (this.collidings.left?.weight ?? 0))) /
          this.weight,
        this.player
      );
    }
    this.gravity();
  };
}
