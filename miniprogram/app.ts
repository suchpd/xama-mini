// app.ts
App<IAppOption>({
  globalData: {
		apiUrl:"http://localhost:8090/"
	},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
		
		const sessionKey = wx.getStorageSync('sessionKey') || null;

		//未登录跳转至登录界面
		if(sessionKey == null){
			wx.navigateTo({
        url: 'pages/login/index',
      })
		}else{
			this.globalData.sessionKey = sessionKey;
		}
  },
})