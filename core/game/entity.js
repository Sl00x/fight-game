class Entity {
  constructor(
    name = "entity",
    position,
    weight,
    boxCollider = false,
    kinetic = true
  ) {
    this.health = 100;
    this.name = name;
    this.speed = 10;
    this.size = { w: 32, h: 32 };
    this.position = position;
    this.boxCollider = boxCollider;
    this.colliderPadding = 20;
    this.isOnGround = false;
    this.jumpVelocity = 0;
    this.kinetic = kinetic;
    this.moveActions = {
      right: false,
      left: false,
    };
    this.collidings = {
      top: [],
      bottom: [],
      right: [],
      left: [],
    };
    this.weight = weight;
  }

  checkCollidings = () => {
    this.collidings = {
      top: [],
      bottom: [],
      right: [],
      left: [],
    };
    for (const entity of scene.entities) {
      if (entity.name === this.name) continue;
      const collidingSide = this.isColliding(entity);
      switch (collidingSide.side) {
        case "top":
          this.collidings.top.push(collidingSide.entity);
          break;
        case "bottom":
          this.collidings.bottom.push(collidingSide.entity);
          break;
        case "right":
          this.collidings.right.push(collidingSide.entity);
          break;
        case "left":
          this.collidings.left.push(collidingSide.entity);
          break;
        default:
          this.isOnGround = false;
          break;
      }
    }
  };

  getDirectionWeight = (direction, checkedCollidings) => {
    return this.collidings[direction].reduce((prev, next) => {
      if (checkedCollidings.includes(next.name)) return prev;
      checkedCollidings.push(next.name);
      return (
        next.weight +
        prev +
        next.getDirectionWeight(direction, checkedCollidings) +
        next.getDirectionWeight("top", checkedCollidings)
      );
    }, 0);
  };

  canMove = (direction) => {
    const checkedCollidings = [];
    return (
      (!["left", "right"].includes(direction) || this.moveActions[direction]) &&
      this.getDirectionWeight(direction, checkedCollidings) +
        (direction !== "top"
          ? this.getDirectionWeight("top", checkedCollidings)
          : 0) <
        this.weight
    );
  };

  move = (direction, speed = this.speed, initial = true) => {
    if (!this.kinetic) return;
    const speedMoved = initial ? getMoveSpeed(this, speed, direction) : speed;
    switch (direction) {
      case "left":
        if (this.collidings.left.length > 0) {
          this.collidings.left.forEach((c) =>
            c.move("left", speedMoved, false)
          );
        }
        this.position.x -= speedMoved;
        break;
      case "right":
        if (this.collidings.right.length > 0) {
          this.collidings.right.forEach((c) =>
            c.move("right", speedMoved, false)
          );
        }
        this.position.x += speedMoved;
        break;
      case "top":
        if (this.collidings.top.length > 0) {
          this.collidings.top.forEach((c) => {
            c.move("top", speedMoved, false);
            if (c.jumpVelocity < 0) {
              c.jumpVelocity = 0;
            }
          });
        }
        this.position.y -= speedMoved;
        break;
      case "bottom":
        this.position.y += speedMoved;
        break;
      default:
        break;
    }
    this.checkCollidings();
    this.checkPositionReplace();
  };

  jump = () => {
    if (!this.checkIsNotFlying() || !this.canMove("top") || !this.kinetic) {
      return;
    }
    this.isOnGround = false;
    this.jumpVelocity = getMoveSpeed(this, INIT_JUMP_VELOCITY, "top");
  };

  checkIsOnGround = () =>
    this.jumpVelocity <= 0 &&
    this.position.y >= window.innerHeight - this.size.h - this.colliderPadding;

  checkIsNotFlying = () => {
    return this.collidings.bottom.length > 0
      ? this.collidings.bottom.some((c) => c.checkIsNotFlying())
      : this.checkIsOnGround();
  };

  checkPositionReplace = () => {
    const collidingBottom = this.collidings.bottom.at(0);
    const collidingTop = this.collidings.top.at(0);
    const collidingLeft = this.collidings.left.at(0);
    const collidingRight = this.collidings.right.at(0);

    if (this.jumpVelocity < 0 && collidingBottom) {
      this.position.y =
        collidingBottom.position.y -
        this.size.h -
        this.colliderPadding -
        collidingBottom.colliderPadding;
      if (this.checkIsNotFlying()) {
        this.jumpVelocity = 0;
        if (this.checkIsOnGround()) this.isOnGround = true;
      }
    }

    if (this.jumpVelocity >= 0 && collidingTop) {
      this.position.y =
        collidingTop.position.y +
        collidingTop.size.h +
        this.colliderPadding +
        collidingTop.colliderPadding;
    }

    if (this.checkIsOnGround()) {
      this.position.y = window.innerHeight - this.size.h - this.colliderPadding;
      this.jumpVelocity = 0;
      this.isOnGround = true;
    }

    if (collidingRight) {
      this.position.x =
        collidingRight.position.x -
        this.size.w -
        this.colliderPadding -
        collidingRight.colliderPadding;
    }

    if (collidingLeft) {
      this.position.x =
        collidingLeft.position.x +
        collidingLeft.size.w +
        this.colliderPadding +
        collidingLeft.colliderPadding;
    }
  };

  gravity = () => {
    if (!this.kinetic) return;
    this.checkCollidings();
    if (
      !this.checkIsOnGround() &&
      ((this.jumpVelocity > 0 && this.canMove("top")) ||
        (this.jumpVelocity <= 0 && this.collidings.bottom.length === 0))
    ) {
      if (this.jumpVelocity > 0 && this.collidings.top.length > 0) {
        this.jumpVelocity = getMoveSpeed(this, this.jumpVelocity, "top");
        this.collidings.top.forEach((c) => {
          c.move("top", this.jumpVelocity, false);
          if (c.jumpVelocity < 0) {
            c.jumpVelocity = 0;
          }
        });
      }

      this.position.y -= this.jumpVelocity;
      this.jumpVelocity -= GRAVITY_CONST;
    }
    this.checkCollidings();
    this.checkPositionReplace();
  };

  isColliding = (entity2) => {
    const rect1 = {
      x: this.position.x - this.colliderPadding - 1,
      y: this.position.y - this.colliderPadding - 1,
      width: this.size.w + this.colliderPadding * 2 + 1,
      height: this.size.h + this.colliderPadding * 2 + 1,
    };

    const rect2 = {
      x: entity2.position.x - entity2.colliderPadding - 1,
      y: entity2.position.y - entity2.colliderPadding - 1,
      width: entity2.size.w + entity2.colliderPadding * 2 + 1,
      height: entity2.size.h + entity2.colliderPadding * 2 + 1,
    };
    // Coordonnées des coins des rectangles
    var rect1Left = rect1.x;
    var rect1Right = rect1.x + rect1.width;
    var rect1Top = rect1.y;
    var rect1Bottom = rect1.y + rect1.height;

    var rect2Left = rect2.x;
    var rect2Right = rect2.x + rect2.width;
    var rect2Top = rect2.y;
    var rect2Bottom = rect2.y + rect2.height;

    // Vérification de la collision
    if (
      rect1Left < rect2Right &&
      rect1Right > rect2Left &&
      rect1Top < rect2Bottom &&
      rect1Bottom > rect2Top
    ) {
      // Collision détectée, déterminer le côté de la collision
      var overlapLeft = rect2Right - rect1Left;
      var overlapRight = rect1Right - rect2Left;
      var overlapTop = rect2Bottom - rect1Top;
      var overlapBottom = rect1Bottom - rect2Top;

      // Déterminer le côté de la collision en fonction du chevauchement maximal
      var minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      if (minOverlap === overlapLeft) {
        return { side: "left", entity: entity2 };
      } else if (minOverlap === overlapRight) {
        return { side: "right", entity: entity2 };
      } else if (minOverlap === overlapTop) {
        return { side: "top", entity: entity2 };
      } else if (minOverlap === overlapBottom) {
        return { side: "bottom", entity: entity2 };
      }
    }

    // Aucune collision détectée
    return { side: null, entity: null };
  };

  update = () => {
    this.gravity();
  };

  draw = () => {
    const g = GameManager.getInstance().getCurrentContext();
    g.strokeStyle = "red";
    g.strokeRect(this.position.x, this.position.y, this.size.w, this.size.h);
    if (this.boxCollider) {
      g.strokeStyle = "lime";
      g.lineWidth = 1;
      g.strokeRect(
        this.position.x - this.colliderPadding,
        this.position.y - this.colliderPadding,
        this.size.w + this.colliderPadding * 2,
        this.size.h + this.colliderPadding * 2
      );
    }
  };
}
