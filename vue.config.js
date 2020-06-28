module.exports={
    publicPath:'./',
  devServer: {
    proxy: {
      '/server': {                //这里最好有一个 /
        target: 'http://www.ketingtv.com/',         // 服务器端接口地址
        // target: 'http://127.0.0.1:7002/',         // 服务器端接口地址
        changeOrigin: true,  //是否跨域
      }
    }

  }
}