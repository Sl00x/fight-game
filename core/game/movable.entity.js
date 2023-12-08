class MovableEntity extends Entity {
  constructor(name, position, weight, spritesheet, kinetic = true) {
    super(name, position, weight, undefined, kinetic, true);
    this.state = "idle";
    this.animationFrame = 0;
    this.lastAnimationTime = Date.now();
    this.lastDirection = "right";
    this.spritesheet = spritesheet;
    this.currentAttack = null;
    this.actions = {
      right: false,
      left: false,
      primaryAttacking: false,
      secondaryAttacking: false,
      running: false,
    };
  }

  updateState = () => {
    let newState = "idle";
    if (this.currentAttack === "primary") newState = "primaryAttacking";
    else if (!this.checkIsNotFlying()) {
      if (this.jumpVelocity >= 0) newState = "jumping";
      else newState = "falling";
    } else if (this.actions.right ^ this.actions.left) {
      if (this.actions.running) newState = "running";
      else newState = "walking";
    }

    if (newState !== this.state) {
      this.state = newState;
      this.animationFrame = 0;
      this.lastAnimationTime = Date.now();
    }
  };

  updateAnimation = () => {
    if (Date.now() - this.lastAnimationTime < 100) return;
    this.animationFrame++;
    if (this.animationFrame >= this.spritesheet.states[this.state].length) {
      if (this.state === "primaryAttacking" && !this.actions.primaryAttacking) {
        this.currentAttack = null;
      }
      this.animationFrame = 0;
    }
    this.lastAnimationTime = Date.now();
  };

  update() {
    this.updateState();
    this.updateAnimation();
    const finalSpeed =
      this.speed *
      (this.actions.running && !this.actions.primaryAttacking
        ? RUNNING_FACTOR
        : 1);
    if (this.actions.right && this.canMove("right")) {
      this.move("right", finalSpeed);
    }
    if (this.actions.left && this.canMove("left")) {
      this.move("left", finalSpeed);
    }
    this.gravity();
  }

  isVisible() {
    if (!super.isVisible()) return false;
    const currentScene = GameManager.getInstance().currentScene;
    const spritesheet = this.spritesheet;
    const state = spritesheet.states[this.state][this.animationFrame];
    const { w } = state.frame;

    const isLeft = this.lastDirection === "left";

    return !(
      -currentScene.backgroundOffset +
        this.position.x -
        (isLeft
          ? w * this.scale - this.size.w - state.collideBoxStart * this.scale
          : -state.collideBoxStart * this.scale + w * this.scale) >
        currentScene.canvas.width ||
      this.position.x +
        (isLeft
          ? w * this.scale - this.size.w - state.collideBoxStart * this.scale
          : -state.collideBoxStart * this.scale + w * this.scale) -
        currentScene.backgroundOffset <
        0
    );
  }

  drawSprite = () => {
    const currentScene = GameManager.getInstance().currentScene;
    const g = currentScene.context;
    const spritesheet = this.spritesheet;
    const state = spritesheet.states[this.state][this.animationFrame];
    const { x, y, w, h } = state.frame;

    const isLeft = this.lastDirection === "left";

    if (!(this instanceof Player) && !this.isVisible()) {
      return;
    }

    g.save();
    if (isLeft) {
      g.scale(-1, 1);
      g.translate(-this.position.x * 2 - this.size.w, 0);
    }
    g.drawImage(
      spritesheet.image,
      x,
      y,
      w,
      h,
      this.position.x -
        state.collideBoxStart * this.scale +
        (!(this instanceof Player)
          ? (isLeft ? 1 : -1) * currentScene.backgroundOffset
          : 0),
      this.position.y,
      w * this.scale,
      h * this.scale
    );
    // Draw debug boxes (red = collide box, green = sprite box)

    // g.strokeStyle = "red";
    // g.strokeRect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.w,
    //   this.size.h
    // );
    // g.strokeStyle = "green";
    // g.strokeRect(
    //   this.position.x - state.collideBoxStart * this.scale,
    //   this.position.y,
    //   w * this.scale,
    //   h * this.scale
    // );
    g.restore();
  };

  draw = () => {
    this.drawSprite();
  };
}
