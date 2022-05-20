function formatName(name) {
  return name
    .split(" ")
    .map((word) =>
      word.length > 2
        ? word[0].toUpperCase() + word.substring(1).toLowerCase()
        : word
    )
    .join(" ");
}

module.exports = formatName;
