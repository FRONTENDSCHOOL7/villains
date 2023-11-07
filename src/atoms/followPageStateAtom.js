import { atom } from 'recoil';

// 팔로워, 팔로잉 페이지 검증 state
const followPageStateAtom = atom({
  key: 'followPageState',
  default: "",
});

export default followPageStateAtom;
