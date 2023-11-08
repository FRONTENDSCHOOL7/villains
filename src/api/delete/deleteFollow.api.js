import client from '../../config/api.config';

const deleteFollow = async (accountname, token) => {
  const user = localStorage.getItem('user');
  const myToken = JSON.parse(user).token;
  return await client.delete(`/profile/${accountname}/unfollow`, {}, client.BothType(token ?? myToken));
};

const deleteFollowQuery = (accountname, token) => ({
  mutationKey: [`delete`, `follow`, accountname],
  mutationFn: async () => deleteFollow(accountname, token),
  enabled: !!token,
});

export { deleteFollow };
export default deleteFollowQuery;
