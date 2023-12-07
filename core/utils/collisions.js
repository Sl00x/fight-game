const getWeightFactor = (entity, initialWeight, direction) => {
  return entity.collidings[direction].reduce((prev, next) => {
    return (
      ((prev * (initialWeight - next.weight)) / initialWeight) *
      getWeightFactor(next, initialWeight, direction)
    );
  }, 1);
};

const getMoveSpeed = (entity, initialSpeed, direction) => {
  return initialSpeed * getWeightFactor(entity, entity.weight, direction);
};
