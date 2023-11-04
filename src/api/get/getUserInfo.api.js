import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import client from '../../config/api.config';

/** 사용자 프로필 정보를 가지고 올 때
 * @param accountname 조회하고 싶은 사용자 계정 이름을 입력
 * @success {
    "profile": {
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
				"isfollow": Boolean,
        "following": [],
        "follower": [],
        "followerCount": Number,
        "followingCount": Number
    }
}
 * @fail 해당 계정이 존재하지 않는 경우(기존에 있던 페이지로 리다이렉트)
 */
const getUserInfo = async (accountname) => {
  const token = useRecoilValue(userAtom);
  return await client.get(`/profile/${accountname}`, client.BothType(token.token));
};

export default getUserInfo;
