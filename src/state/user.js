import { atom } from "recoil";

export const LoadingUserInfoState = atom({
  key: 'LoadingUserInfo',
  default: true
});

export const UserInfoState = atom({
  key: 'CurrentUserInfo',
  default: null
});
