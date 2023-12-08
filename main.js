const gameManager = GameManager.getInstance();

const playerEntity = new Player({ x: 500, y: 400 });
const scene = new Scene("scene 1", "assets/maps/City2.png", 100);

gameManager.setPlayer(playerEntity);
gameManager.addScene(scene);
gameManager.setCurrentScene(scene.name);

const keyboardEVent = new KeyboardEvent(playerEntity);

scene.entities = [
  // new Enemy("enemy 1", { x: 550, y: 400 }, getRaider1Spritesheet()),
  playerEntity,
  new Box(
    "Box 1",
    { x: 220, y: 100 },
    1,
    {
      w: 100,
      h: 100,
    },
    true
  ),
  new Box(
    "Box 2",
    { x: 350, y: 100 },
    1,
    {
      w: 100,
      h: 100,
    },
    true
  ),
];

scene.run(() => {
  for (const entity of scene.entities) {
    entity.update();
  }

  scene.drawBackground();
  for (const entity of scene.entities) {
    entity.draw();
  }
});
