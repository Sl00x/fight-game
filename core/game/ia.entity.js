class IA extends MovableEntity {
  constructor(name, position, weight, spritesheet) {
    super(name, position, weight, spritesheet, true);
  }

  getDistance = (target) => {
    const currentScene = GameManager.getInstance().currentScene;
    const dx =
      this.position.x - currentScene.backgroundOffset - target.position.x;
    const dy = this.position.y - target.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  getDirection = (target) => {
    const currentScene = GameManager.getInstance().currentScene;
    return this.position.x - currentScene.backgroundOffset < target.position.x
      ? "right"
      : "left";
  };

  follow = (target) => {
    const direction = this.getDirection(target);
    this.move(direction);
  };

  update() {
    super.update();
    const currentScene = GameManager.getInstance().currentScene;
    const nearestEntity = currentScene.entities.reduce(
      (nearest, entity) => {
        if (entity.name === this.name || !entity.canBeCrossed) return nearest;
        const distance = this.getDistance(entity);
        if (distance > 350) return nearest;
        if (distance < nearest.distance) {
          nearest.distance = distance;
          nearest.entity = entity;
        }
        return nearest;
      },
      { distance: Infinity, entity: null }
    );

    if (nearestEntity.entity) {
      const direction = this.getDirection(nearestEntity.entity);
      this.lastDirection = direction;
    }
  }
}
