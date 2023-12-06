class Box extends Entity {
  constructor(name, position, weight, kinetic = true) {
    super(name, position, weight, true, kinetic);
    this.size = { w: 32, h: 32 };
  }
}
