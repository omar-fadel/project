const data = [
  {
    username: "omar",
    password: "ayhaga",
    url: 'www.google.com'
  },
];

export const mockGetUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
