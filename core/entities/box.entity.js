class Box extends Entity {
  constructor(name, position, weight, size = null, kinetic = false) {
    super(
      name,
      position,
      weight,
      0,
      kinetic,
      undefined,
      "assets/objects/crate.png"
    );
    this.size = size ?? { w: 32, h: 32 };
  }
}
