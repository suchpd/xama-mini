// pages/login/index.ts
var app = getApp<IAppOption>()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},
	login(){
			wx.getUserProfile({
				desc: '使用户得到更好的体验',
				success: (res) => {
					let user = res.userInfo
					wx.setStorageSync('user', user)
					this.doLogin()
				},
				fail: res => {
						wx.showToast({
							title: '登录失败',
							icon:'error'
						})
				}
			})
		},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	/**
	 * 登录
	 */
	doLogin(){
	
    // 登录
    wx.login({
      success: res => {
				if(res.code){
					//发起网络请求
					const requestUrl = `${app.globalData.apiUrl}api/miniProgram/miniProgramLogin`;
					wx.request({
						url: requestUrl,
						method:"POST",
						data: {
							code: res.code
						},
						success (res) {
							console.log("登录成功！")
							console.log(res.data)
							
							var datax;
							if (typeof (res.data) == "string") {
								var result = res.data.replace(/\(|\)/g, "");
								console.log("result:" + result);
								var obj: object = JSON.parse(result);
								console.log("obj:" + (typeof obj));
								datax = obj as Record<string, any>;
							} else {
									datax = res.data as Record<string, any>;
							}
							
							console.log(datax.sessionKey)
							wx.setStorage({
								key:"sessionKey",
								data:datax.sessionKey
							})
							wx.setStorage({
								key:"openid",
								data:datax.openid
							})


							wx.showToast({
								icon:"success",
								title: '登录成功',
							})
						setTimeout(()=>{
							wx.switchTab({
								url: '/pages/minedata/index'
							});
						},2000)
						}
					})
				}else{
					console.log("登录失败！" + res.errMsg)
				}
		
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
			},
	
    })
	}
})