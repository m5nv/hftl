export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@mail.com" && password === "password") {
        console.log('resolving: ', email, password);
        resolve({email, password});
      } else {
        console.log('rejecting:', email, password);
        reject({credentials: 'email or password is invalid'});
      }
    }, 200);
  });
};
