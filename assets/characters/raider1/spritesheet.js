const getRaider1Spritesheet = () => {
  const getIdleFrame = (x) => ({
    frame: {
      x: x * 160 + 4,
      y: 4,
      w: 156,
      h: 268,
    },
    collideBoxStart: 24,
  });
  const spritesheet = {
    image: new Image(),
    colliderWidth: 72,
    colliderHeight: 268,
    states: {
      idle: [
        getIdleFrame(0),
        getIdleFrame(1),
        getIdleFrame(2),
        getIdleFrame(3),
        getIdleFrame(4),
        getIdleFrame(5),
      ],
      walking: [
        {
          frame: {
            x: 4,
            y: 276,
            w: 96,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 104,
            y: 276,
            w: 96,
            h: 268,
          },
          collideBoxStart: 0,
        },
        {
          frame: {
            x: 204,
            y: 276,
            w: 96,
            h: 268,
          },
          collideBoxStart: 0,
        },
        {
          frame: {
            x: 304,
            y: 276,
            w: 108,
            h: 268,
          },
          collideBoxStart: 8,
        },
        {
          frame: {
            x: 416,
            y: 276,
            w: 100,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 520,
            y: 276,
            w: 96,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 620,
            y: 276,
            w: 100,
            h: 268,
          },
          collideBoxStart: 0,
        },
        {
          frame: {
            x: 724,
            y: 276,
            w: 100,
            h: 268,
          },
          collideBoxStart: 8,
        },
      ],
      running: [
        {
          frame: {
            x: 0,
            y: 548,
            w: 96,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 104,
            y: 548,
            w: 104,
            h: 268,
          },
          collideBoxStart: 12,
        },
        {
          frame: {
            x: 212,
            y: 548,
            w: 152,
            h: 268,
          },
          collideBoxStart: 40,
        },
        {
          frame: {
            x: 368,
            y: 548,
            w: 96,
            h: 268,
          },
          collideBoxStart: 12,
        },
        {
          frame: {
            x: 468,
            y: 548,
            w: 92,
            h: 268,
          },
          collideBoxStart: 8,
        },
        {
          frame: {
            x: 564,
            y: 548,
            w: 96,
            h: 268,
          },
          collideBoxStart: 12,
        },
        {
          frame: {
            x: 664,
            y: 548,
            w: 152,
            h: 268,
          },
          collideBoxStart: 40,
        },
        {
          frame: {
            x: 820,
            y: 548,
            w: 92,
            h: 268,
          },
          collideBoxStart: 12,
        },
      ],
      jumping: [
        {
          frame: {
            x: 4,
            y: 820,
            w: 96,
            h: 268,
          },
          collideBoxStart: 8,
        },
      ],
      falling: [
        {
          frame: {
            x: 4,
            y: 1092,
            w: 108,
            h: 268,
          },
          collideBoxStart: 8,
        },
      ],
      primaryAttacking: [
        {
          frame: {
            x: 4,
            y: 1364,
            w: 140,
            h: 268,
          },
          collideBoxStart: 8,
        },
        {
          frame: {
            x: 148,
            y: 1364,
            w: 152,
            h: 268,
          },
          collideBoxStart: 32,
        },
        {
          frame: {
            x: 304,
            y: 1364,
            w: 192,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 500,
            y: 1364,
            w: 196,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 700,
            y: 1364,
            w: 156,
            h: 268,
          },
          collideBoxStart: 4,
        },
        {
          frame: {
            x: 860,
            y: 1364,
            w: 144,
            h: 268,
          },
          collideBoxStart: 16,
        },
      ],
    },
  };
  spritesheet.image.src = "assets/characters/raider1/spritesheet.png";
  return spritesheet;
};
