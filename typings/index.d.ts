/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
		userInfo?: WechatMiniprogram.UserInfo,
		apiUrl?:"http://localhost:8090/",
		sessionKey?:null
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}