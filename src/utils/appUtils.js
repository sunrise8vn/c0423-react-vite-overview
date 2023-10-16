export const randomColor = () => {
  const colors = ['red', 'yellow', 'green', 'blue', 'purple', 'pink'];
  const random = Math.trunc(Math.random() * colors.length);
  return colors[random];
};
