export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getUserInitials = (name: string) => {
  return `${name.split(" ")[0][0].toUpperCase()}${name
    .split(" ")[1][0]
    .toUpperCase()}`;
};
