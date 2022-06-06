const useClassNames = () => {
  return (...args: Arguments) => {
    const [firstArg, secondArg] = args;

    const haveMultipleArgs = args.length > 1;

    const first = haveMultipleArgs ? firstArg : "";
    const second = haveMultipleArgs ? secondArg : firstArg;
    return `${first} ${Object.keys(second)
      .filter((key) => second[key])
      .join(" ")}`;
  };
};

type Arguments =
  | [string, { [key in string]: boolean }]
  | [{ [key in string]: boolean }];

export { useClassNames };
