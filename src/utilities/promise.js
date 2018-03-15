export const atLeast = (minimum, promises = []) => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(resolve, minimum);
  });

  return Promise.all([...promises, timeout]);
};
