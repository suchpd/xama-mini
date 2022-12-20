/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
		userInfo?: WechatMiniprogram.UserInfo,
		apiUrl?:"http://1.15.172.245:8090/",
		sessionKey?:null
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}