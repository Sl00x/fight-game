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
      RIGHT: false,
      LEFT: false,
    };
    this.collidings = {
      top: null,
      bottom: null,
      right: null,
      left: null,
    };
    this.weight = weight;
  }

  checkCollidings = () => {
    this.collidings = {
      top: null,
      bottom: null,
      right: null,
      left: null,
    };
    for (const entity of scene.entities) {
      if (entity.name === this.name) continue;
      const collidingSide = this.isColliding(entity);
      switch (collidingSide.side) {
        case "top":
          this.collidings.top = collidingSide.entity;
          break;
        case "bottom":
          this.collidings.bottom = collidingSide.entity;
          break;
        case "right":
          this.collidings.right = collidingSide.entity;
          break;
        case "left":
          this.collidings.left = collidingSide.entity;
          break;
        default:
          this.isOnGround = false;
          break;
      }
    }
  };

  move = (direction, speed = this.speed, initialWeight = null) => {
    if (!this.kinetic) return;
    let speedMoved = speed;
    switch (direction) {
      case "LEFT":
        if (this.collidings.left) {
          speedMoved = this.collidings.left.move(
            "LEFT",
            speed *
              (initialWeight
                ? (initialWeight - this.collidings.left.weight) / initialWeight
                : 1),
            initialWeight ?? this.weight
          );
        }
        this.position.x -= speedMoved;
        break;
      case "RIGHT":
        if (this.collidings.right) {
          speedMoved = this.collidings.right.move(
            "RIGHT",
            speed *
              (initialWeight
                ? (initialWeight - this.collidings.right.weight) / initialWeight
                : 1),
            initialWeight ?? this.weight
          );
        }
        this.position.x += speedMoved;
        break;
      case "UP":
        if (this.collidings.top) {
          speedMoved = this.collidings.top.move(
            "UP",
            speed *
              (initialWeight
                ? (initialWeight - this.collidings.top.weight) / initialWeight
                : 1),
            initialWeight ?? this.weight
          );
          if (this.collidings.top.jumpVelocity < 0) {
            this.collidings.top.jumpVelocity = 0;
          }
        }
        this.position.y -= speedMoved;
        break;
      case "DOWN":
        this.position.y += speedMoved;
        break;
      default:
        break;
    }
    this.checkCollidings();
    this.checkPositionReplace();
    return speedMoved;
  };

  jump = () => {
    if (
      !this.isOnGround ||
      (this.collidings.top && this.collidings.top.weight >= this.weight) ||
      !this.kinetic
    ) {
      return;
    }
    this.isOnGround = false;
    this.jumpVelocity =
      (INIT_JUMP_VELOCITY *
        (this.weight - (this.collidings.top?.weight ?? 0))) /
      this.weight;
  };

  checkIsOnGround = () =>
    this.jumpVelocity < 0 &&
    this.position.y >= window.innerHeight - this.size.h - this.colliderPadding;

  checkIsNotFlying = () => {
    return this.collidings.bottom
      ? this.collidings.bottom.checkIsNotFlying()
      : this.checkIsOnGround();
  };

  checkPositionReplace = () => {
    const collidingBottom = this.collidings.bottom;
    const collidingTop = this.collidings.top;

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

    if (this.collidings.right) {
      this.position.x =
        this.collidings.right.position.x -
        this.size.w -
        this.colliderPadding -
        this.collidings.right.colliderPadding;
    }

    if (this.collidings.left) {
      this.position.x =
        this.collidings.left.position.x +
        this.collidings.left.size.w +
        this.colliderPadding +
        this.collidings.left.colliderPadding;
    }
  };

  gravity = () => {
    if (!this.kinetic) return;
    this.checkCollidings();
    if (
      !this.checkIsOnGround() &&
      ((this.jumpVelocity > 0 &&
        (!this.collidings.top || this.collidings.top.weight < this.weight)) ||
        (this.jumpVelocity <= 0 && !this.collidings.bottom))
    ) {
      if (this.jumpVelocity > 0 && this.collidings.top) {
        this.jumpVelocity = this.collidings.top.move(
          "UP",
          (this.jumpVelocity * (this.weight - this.collidings.top.weight)) /
            this.weight,
          this.weight
        );

        if (this.collidings.top.jumpVelocity < 0) {
          this.collidings.top.jumpVelocity = 0;
        }
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
    const scene = Scene.getInstance();
    const g = scene.context;
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
