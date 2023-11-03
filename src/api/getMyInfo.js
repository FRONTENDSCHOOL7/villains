import { useRecoilValue } from 'recoil';
import client from '../config/api.config';
import userAtom from '../atoms/userAtom';

//프로필 수정 - 원래 있던 정보를 불러와야 할 때 사용합니다!
const getMyInfo = async () => {
  const token = useRecoilValue(userAtom);
  return await client.get(`/user/myinfo`, client.AuthType(token.token));
};

export default getMyInfo;
