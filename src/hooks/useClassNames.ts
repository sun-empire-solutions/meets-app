const useClassNames = () => {
  return (classNames: string, classObject: { [key in string]: boolean }) =>
    `${classNames} ${Object.keys(classObject)
      .filter((key) => classObject[key])
      .join(" ")}`;
};

export { useClassNames };
