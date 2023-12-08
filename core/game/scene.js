class Scene {
  constructor(name, image, bottomPadding = 0) {
    this.name = name;
    this.canvas = document.getElementById("scene");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.backgroundColor = "whitesmoke";
    this.entities = [];
    this.background = new Image();
    this.background.src = image;
    this.bottomPadding = bottomPadding;
    this.padding = 300;
    this.backgroundOffset = 0;
  }

  drawBackground = () => {
    const player = GameManager.getInstance().player;
    this.context.clearRect(0, 0, scene.canvas.width, scene.canvas.height);
    const modulo = this.backgroundOffset % this.canvas.width;
    this.context.drawImage(
      this.background,
      -this.canvas.width - modulo,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.context.drawImage(
      this.background,
      -modulo,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.context.drawImage(
      this.background,
      this.canvas.width - modulo,
      0,
      this.canvas.width,
      this.canvas.height
    );
  };

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
