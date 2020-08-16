export const login = (email, password) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(email, password);
    }, 500);
  });
};
