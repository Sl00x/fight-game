const gameManager = GameManager.getInstance();

const player = new Player({ x: 100, y: 400 }, true);
const scene = new Scene("scene 1");

gameManager.setPlayer(player);
gameManager.addScene(scene);
gameManager.setCurrentScene(scene.name);

const keyboardEVent = new KeyboardEvent(player);

scene.entities = [
  player,
  // new Box("Box 1", { x: 100, y: 0 }, 5),
  new Box("Box 2", { x: 220, y: 100 }, 1),
  new Box("Box 3", { x: 300, y: scene.canvas.height - 70 }, 0, false),
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
