// import Constants from '@/components/Constants'
import baseUrl from './baseUrl'
import axs from 'axios'
axs.defaults.baseURL = process.env.VUE_APP_BASEURL;
axs.defaults.timeout = 1000000;
// import utils from './src/utils';
import gConfig from './src/config';
const loginPath = gConfig.loginPath;
// axs.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加一个请求拦截器
axs.interceptors.request.use(function (config) {
  if (config.url.indexOf(loginPath) > -1) {
    return config;
  } else {
    const token = utils.getToken();
    if (token) {
      config.headers['token'] = token;
      // if (config.method === 'delete') {
      //   config.data = { data: null } // 这个是关键点，加入这行就可以了
      // }
      return config;
    } else if (!window.gVueInterceptor) {
      window.gVueInterceptor = true;
      // window.$rootVue.$message.error('您尚未登录，请登录')
      const path = window.$rootVue.$route.path;
      if (path !== loginPath) {
        window.$rootVue.$router.replace({
          path: loginPath,
          query: { redirect_url: path }
        })
      } else {
        window.$rootVue.$router.replace({
          path: loginPath
        })
      }
      return Promise.reject('no token');
    } else {
      return Promise.reject('no token');
    }
  }
}, function (error) {
  return Promise.reject(error);
});
// 添加一个响应拦截器
axs.interceptors.response.use(function (response) {
  if(response.data.status == gConfig.tokenExpireCode && !window.gVueInterceptor){
    window.gVueInterceptor = true;
    // window.$rootVue.$message.error('登录超时，请重新登录')
    const path = window.$rootVue.$route.path;
    if(path !== loginPath){
      window.$rootVue.$router.replace({
        path:loginPath,
        query:{redirect_url:path}
      })
    }else{
      window.$rootVue.$router.replace({
        path:loginPath
      })
    }
  }
  return response.data;
}, function (error) {
  return Promise.reject(error);
});
// const getCookie = name=>{
//   let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//   arr = document.cookie.match(reg);
//   if(arr && arr.length>1 && arr[2]){
//     return unescape(arr[2]);
//   }else{
//     return null
//   }
// }

export default {
  baseUrl,
  axs,
  get(url, data, headers){
    return axs.get(url,{params:data},headers);
  },
  post: function (url, data) {
    // const csrf = getCookie("csrfToken");
    // const token = {'x-csrf-token': csrf}
    const headers = {
      headers:{}
    };
    return axs.post(url, data, headers);
  },
  put(url, data){
    return axs.put(url,data);
  },
  del(url, data, headers){
    return axs.delete(url,data,headers);
  },
  request(url, data, method, headers){
    method = method || 'get';
    method = method.toLocaleLowerCase();
    let p = null;
    switch(method){
      case 'get':
        p = this.get(url,data, headers);
        break;
      case 'post':
        p =  this.post(url,data);
        break;
      case 'put':
        p =  this.put(url,data);
        break;
      case 'del':
        p =  this.del(url,data, headers);
        break;
    }
    return p;
  }
}
