
class CommonTools{
    private static instance: CommonTools;

	private constructor() {}

    /**
     * 单例
    */
    public static getInstance(): CommonTools {
        if (!this.instance) {
            this.instance = new CommonTools();
        }
		
        return this.instance;
    }


    public showLoading(value:string){
		wx.showLoading({
			title: value,
		})
	}

	public hideLoading(){
		wx.hideLoading();
    }
    
    public showToast(icon: any,title:string){
        wx.showToast({
            icon: icon,
            title: title,
        })
    }
}

export const Tools = CommonTools.getInstance();