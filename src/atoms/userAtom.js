import { atom } from 'recoil';

const userAtom = atom({
  key: 'user',
  default: {},
});

export default userAtom;
