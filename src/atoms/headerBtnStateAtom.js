import { atom } from 'recoil';

// 헤더 disabled state
export const headerBtnStateAtom = atom({
  key: 'headerBtnState',
  default: false,
});

// 헤더 label = 버튼 text, callback = onClick
export const headerBtnOptionsAtom = atom({
  key: 'headerBtnOptions',
  default: [],
});
