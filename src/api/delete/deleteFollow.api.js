import { useRecoilValue } from 'recoil';
import client from '../../config/api.config';
import userAtom from '../../atoms/userAtom';

/** 팔로우를 취소합니다.
 * @param accountname 팔로우를 취소할 사용자 계정
 * @fail 해당 계정이 존재하지 않을 때
 * @success 해당 계정의 프로필 정보
 * {
    "profile": {
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
				"isfollow": Boolean,
        "following": [],
        "follower": [],
        "followerCount": 0,
        "followingCount": 0
    }
}

 */
const deleteFollow = async (accountname) => {
  const token = useRecoilValue(userAtom);
  return await client.delete(`/profile/${accountname}/unfollow`, client.BothType(token.token));
};

export default deleteFollow;
