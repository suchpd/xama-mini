import { Tools } from "../../utils/commonTool";
import { ApiClient } from "../../utils/httpRequest";

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
	 * 授权
	 */
	authorization() {
		Tools.showLoading("加载中");
		wx.getUserProfile({
			desc: '使用户得到更好的体验',
			success: (res) => {
				let user = res.userInfo
				wx.setStorageSync('USER', user)
				Tools.hideLoading();
				this.login()
			},
			fail: res => {
				Tools.hideLoading();
				wx.showToast({
					title: '登录失败',
					icon: 'error'
				})
			}
		})
	},

	/**
	 * 登录
	 */
	login() {

		Tools.showLoading("登录中");

		// 登录
		wx.login({
			success: res => {
				if (res.code) {
					ApiClient.post("miniProgram/miniProgramLogin", {
						code: res.code
					}).then((res: any) => {
						Tools.hideLoading();

						wx.setStorageSync('SESSION_KEY',res.sessionKey);
						wx.setStorageSync('OPEN_ID',res.openId);
						wx.setStorageSync('EXPIRED_TIME',(new Date().getTime() + 24 * 60 * 60 * 1000))

						Tools.hideLoading();
						Tools.showToast("success",'登录成功');
						setTimeout(() => {
							wx.switchTab({
								url: '/pages/minedata/index'
							});
						}, 1000)
					}, (error) => {
						console.log("登陆失败" + error)
					})
				} else {
					console.log("登录失败！" + res.errMsg)
				}

				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			},

		})
	},
})