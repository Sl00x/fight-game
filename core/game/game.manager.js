class GameManager {
  static instance;

  constructor() {
    this.player = null;
    this.scenes = [];
    this.currentScene = null;
  }

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  setPlayer(player) {
    this.player = player;
  }

  addScene(scene) {
    this.scenes.push(scene);
  }

  setCurrentScene(sceneName) {
    this.currentScene = this.scenes.find((scene) => scene.name === sceneName);
  }

  getCurrentContext() {
    return this.currentScene.context;
  }
}
