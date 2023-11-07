import client from "../../config/api.config";

const postUnFollow = async (accountname) => {
  const user = useRecoilValue(userAtom);
  // const token = JSON.parse(localStorage.getItem('user')).token;
  return await client.delete(`/profile/${accountname && user.accountname}/unfollow`, {}, client.BothType(user.token));
};

export default postUnFollow;