import { atom } from 'recoil';

const queryFocusAtom = atom({
  key: 'focus',
  default: false,
});

export default queryFocusAtom;
