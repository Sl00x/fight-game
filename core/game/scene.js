class Scene {
  constructor(name) {
    this.name = name;
    this.canvas = document.getElementById("scene");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.backgroundColor = "black";
    this.entities = [];
  }

  run = (callback) => {
    let lastTime;
    let fpsInterval = 1000 / 60; // 60 FPS
    const animate = (currentTime) => {
      requestAnimationFrame(animate);
      if (!lastTime) {
        lastTime = currentTime;
      }
      const elapsed = currentTime - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);
        callback();
      }
    };
    requestAnimationFrame(animate);
  };
}
