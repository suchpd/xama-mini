/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
		userInfo?: WechatMiniprogram.UserInfo,
		apiUrl?:"https://backendapi.xama.vip/",
		sessionKey?:null
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}