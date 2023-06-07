import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { localCache } from "@/utils/cache";
import { TOKEN } from "@/global/constants";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default hyRequest
