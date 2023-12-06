const scene = Scene.getInstance();
const player = new Player({ x: 100, y: 400 }, true);

const keyboardEVent = new KeyboardEvent(player);

scene.entities = [
  player,
  new Box("Box 1", { x: 100, y: 0 }, 5),
  new Box("Box 2", { x: 100, y: 100 }, 40),
  new Box("Box 3", { x: 100, y: 200 }, 40),
];

scene.run(() => {
  for (const entity of scene.entities) {
    entity.update();
  }

  scene.context.clearRect(0, 0, scene.canvas.width, scene.canvas.height);
  for (const entity of scene.entities) {
    entity.draw();
  }
});
