const confirmHealth = (snack) => {
  const { protein, fiber, added_sugar } = snack;
  if (!protein || !fiber || !added_sugar) {
    snack.is_healthy = null;
  }
  if ((protein >= 5 || fiber >= 5) && added_sugar < 5) {
    snack.is_healthy = true;
  } else if (
    typeof protein != "number" ||
    typeof fiber != "number" ||
    typeof added_sugar != "number"
  ) {
    snack.is_healthy = null;
  } else {
    snack.is_healthy = false;
  }
  return snack.is_healthy;
};

module.exports = confirmHealth;
