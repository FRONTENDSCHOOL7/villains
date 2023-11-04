import { useRecoilValue } from 'recoil';
import client from '../../config/api.config';
import userAtom from '../../atoms/userAtom';

/**
 * 프로필 수정 완료 시 보내는 요청입니다.
 * @param newUserInfo = {
 *  user: {
 *      "username": String,
 *      "accountname": String,
 *      "intro": String,
 *      "image": String
 *  } 
 * }
 * 
 * @fail accountname이 중복일 경우 <- 이를 피하기 위해 accountname은 수정하지 않도록 했습니다.
 * @success {
    "user": {
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
        "following": [ ],
        "follower": [ ],
        "followerCount": Number,
        "followingCount": Number
    }
}
*/
const updateUser = async (newUserInfo) => {
  const token = useRecoilValue(userAtom);
  return await client.put(`/user`, newUserInfo, client.BothType(token.token));
};

export default updateUser;
