const formatTitle = (title) => {
  if (title.length > 20) {
    const separators = [":", "(", "-"];
    for (let i = 0; i < separators.length; i++) {
      const index = title.indexOf(separators[i]);
      if (index !== -1 && index <= 20) {
        return title.slice(0, index).trim();
      }
    }
  }
  return title;
};

export default formatTitle;
