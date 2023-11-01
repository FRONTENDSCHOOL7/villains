import { atom } from 'recoil';

export const bottomSheetStateAtom = atom({
  key: 'bottomSheetState',
  default: false,
});

export const bottomSheetOptions = atom({
  key: 'bottomSheetOptions',
  default: [],
});
