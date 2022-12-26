const host = 'https://backendapi.xama.vip/api/';

/**
 * http请求配置
*/
interface RequestConfig {
    url: String;
    method?: HttpMethod;
    data?: any;
    needToken?: Boolean;
    header?: Object
}

/**
 * http请求方法枚举
*/
enum HttpMethod {
    GET,
    POST
}


class HttpRequest {

    private static instance: HttpRequest;

	private constructor() {}

    /**
     * 单例
    */
    public static getInstance(): HttpRequest {
        if (!this.instance) {
            this.instance = new HttpRequest();
        }
		
        return this.instance;
    }



	/**
	 * 公用请求方法
	*/
	public request(requestConfig: RequestConfig): Promise<Object> {
        return new Promise((resolve, reject) => {
            let header = {
              'content-type': 'application/json',
			};
            wx.request({
              method: requestConfig.method === HttpMethod.GET ? "GET" : "POST",
              url: `${host}${requestConfig.url}`,
              data: requestConfig.data,
              header: Object.assign(header, requestConfig?.header),
              success:(res) => resolve(res.data),
              fail:(err) =>  reject(err),
            });
        });
    }

	/**
	 * url:请求url
	 * config： 包括请求头
	*/
    public get(url: string, config?:Object):Promise<Object> {
        return this.request({ url, method: HttpMethod.GET, ...config })
    }

    public post(url: string, data: Object, config?:Object):Promise<Object>  {
        return this.request({ url, method: HttpMethod.POST, data, ...config })
    }

}

export const ApiClient = HttpRequest.getInstance();
