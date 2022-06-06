const isHealthy = (snack) => {
  const { protein, fiber, added_sugar } = snack;
  if ((protein >= 5 || fiber >= 5) && added_sugar < 5) return true;

  return false;
};

module.exports = isHealthy;
