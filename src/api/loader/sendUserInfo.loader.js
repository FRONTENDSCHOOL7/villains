const sendUserInfo = async () => {
  const user = await localStorage.getItem('user');
  return JSON.parse(user);
};

export default sendUserInfo;
