export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getUserInitials = (name: string) => {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[1];

  if (!firstName || !lastName) {
    return "WU";
  }

  return `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`;
};
