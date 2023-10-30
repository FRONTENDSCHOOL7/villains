import client from '../config/api.config';

const getCheckToken = (token) => {
  return client.get(`/user/checktoken`, { ...client.AuthType(token) });
};

export default getCheckToken;
